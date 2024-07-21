FROM node:18.16-alpine as build

COPY . /app/www

RUN npm install -g cordova ionic
RUN npm install -g bower
RUN npm install -g gulp

WORKDIR /app/www

RUN npm install --force
RUN ionic build --prod

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/www/www/ /usr/share/nginx/html/

COPY --from=build /app/www/nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80