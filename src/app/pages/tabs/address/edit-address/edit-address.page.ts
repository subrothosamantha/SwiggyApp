 import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { iosTransitionAnimation } from '@ionic/angular';
import { SearchLocationComponent } from 'src/app/components/search-location/search-location.component';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})
export class EditAddressPage implements OnInit {

  form: FormGroup;
  location_name: string = 'Locating...';
  isSubmitted = false;

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl('', {validators: [Validators.required]}),
      house: new FormControl('', {validators: [Validators.required]}),
      landmark: new FormControl('', {validators: [Validators.required]}),
    });
  }

  toggleSubmit() {
    this.isSubmitted = !this.isSubmitted;
  }

  onSubmit() {
    this.toggleSubmit();
    console.log(this.form);
    if(!this.form.valid) return;
    setTimeout(() => {
      this.toggleSubmit();
    }, 2000);
  }

  async searchLocation(){
    try{
       const option={
         component: SearchLocationComponent,
          cssClass: 'address-modal',
           swipeToClose:true, 
          initialBreakpoint: 0.5,
          breakpoints: [0, 0.3, 1] 
       }
       const location = await this.globalService.createModal(option);
    }catch(e){
      console.log(e);
      
    }
  }
}
