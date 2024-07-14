import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  STORAGE_KEY_EVENTS = "events";

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
  }

  async init() {
    if(this._storage != null) {
      return;
    }
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async keys(): Promise<any>
  {
    await this.init();
    return await this._storage?.keys();
  }

  public async set(key: string, value: any): Promise<any> {
    await this.init();
    return await this._storage?.set(key, value);
  }

  public async get(key: string): Promise<any> {
    await this.init();
    return await this._storage?.get(key);
  }
}
