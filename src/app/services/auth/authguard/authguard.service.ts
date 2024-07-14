import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { LocalStorageService } from '../../general/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

   constructor(
		private router: Router,
		private storage: LocalStorageService
	) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    console.log(route);
    let authenticated: boolean;
		
		authenticated = await this.storage.get("loggedIn").then((data) => {
        return data;
		});

    if (!authenticated) {
			this.router.navigate(['/login']);
      return false;
    }
    return authenticated;
  }
}
