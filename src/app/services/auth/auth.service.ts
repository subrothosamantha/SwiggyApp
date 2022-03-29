import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: StorageService) { }

  async logIn(email: string, password : string): Promise<any>{
    return await this.storage.setStorage('uid','alsdjfalsdjf;alsdjfl');
  }

 async getId(){
  return this.storage.getStorage('uid');
  }

 async register(formValue){
    return await this.storage.setStorage('uid', 'alsdjfalsdjf;alsdjfl');
  }
  
  async resetPassword(email: string) {
    return await email;
  }

  logOut(){


  }
}
