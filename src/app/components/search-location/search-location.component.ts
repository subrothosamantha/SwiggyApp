import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/models/address.model';
import { AddressService } from 'src/app/services/address/address.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { GoogleMapsService } from 'src/app/services/google-maps.service';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.scss'],
})
export class SearchLocationComponent implements OnInit {

  query: string;
  places: any[] = [];
  placeSub: Subscription;
  @Input() from;
  addressSub: Subscription;
  savedPlaces: any;

  constructor(
    private global: GlobalService, 
    private maps: GoogleMapsService,
    private addressService: AddressService
  ) { }

  ngOnInit() {
    // this.placeSub = this.maps.places.subscribe(places => {
    //   this.places = places;
    // });
    if(this.from){
      this.getSavedPlaces();
    }
  }
  selectSavedPlace(place) {
    this.dismiss(place);
  }


  async getSavedPlaces(){
    this.global.showLoader();
    this.addressSub = this.addressService.addresses.subscribe(address=>{
      this.savedPlaces = address;
    });
    await this.addressService.getAddress();
    this.global.hideLoader();
  }

  choosePlace(place) {
    console.log(place);
    this.dismiss(place);
  }


  async onSearchChange(event) {
    console.log(event);
    this.global.showLoader();
    this.query = event.detail.value;
 //   if(this.query.length > 0) await this.maps.getPlaces(this.query);
    this.global.hideLoader();
  }

  dismiss(val?) {
    this.global.modalDismiss(val);
  }

  ngOnDestroy() {
    if(this.placeSub) this.placeSub.unsubscribe();
    if(this.addressSub) this.addressSub.unsubscribe();
  }

}
