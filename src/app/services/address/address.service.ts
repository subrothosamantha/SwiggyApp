import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private _addresses = new BehaviorSubject<any>(null);

  get addresses(){
     return this._addresses.asObservable();
  }


  constructor(private api:ApiService) { }
  
  getAddress(){
    try{
      let allAddress = this.api.addresses;
      //it will monitor if any changes were made in the code or not
      this._addresses.next(allAddress);
  }catch(e){
    console.log(e);
    throw(e);
  }
  }

  async addAddress(param){
      
  }

  async updateAddress(id,param){

  }

  async deleteAddress(param){
    param.delete = true;
    this._addresses.next(param);
  }
}
