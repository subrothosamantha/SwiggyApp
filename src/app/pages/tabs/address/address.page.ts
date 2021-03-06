import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/models/address.model';
import { AddressService } from 'src/app/services/address/address.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit,OnDestroy {

  isLoading: boolean;
  addresses: Address[] = [];
  addressesSub : Subscription;
  model:any={
    title:'no addressess added yet',
    icon:'location-outline'
  };

  constructor(private global : GlobalService,
             private addressService: AddressService) { }


  /**
   * subscribing all the changes that are appearing in all 
   * addresses
   */           
  ngOnInit() {
    this.addressesSub = this.addressService.addresses.subscribe(address => {
      console.log('addresses: ', address);
      this.addresses = address;
    });
    this.getAddresses();
  }

  getAddresses() {    
    this.isLoading = true;
    setTimeout(async() => {
      // this.addresses = this.addressService.getAddress();
      await this.addressService.getAddress();
      this.isLoading = false;
      
      
    }, 3000);
    
  }

  getIcon(title) {
   return this.global.getIcon(title);
  }

  editAddress(address) {}

  deleteAddress(address) {
    console.log('address: ', address);
    this.global.showAlert(
      'Are you sure you want to delete this address?',
      'Confirm',
      [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('cancel');
            return;
          }
        },
        {
          text: 'Yes',
          handler: async () => {
            this.global.showLoader();
            await this.addressService.deleteAddress(address);
            this.global.hideLoader();
          }
        }
      ]
    )
  }

  ngOnDestroy() {
    if(this.addressesSub) this.addressesSub.unsubscribe();
  }
}
