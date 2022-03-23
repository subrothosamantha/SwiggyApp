import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { IonContent } from '@ionic/angular';
import { moveMessagePortToContext } from 'worker_threads';
import * as moment from 'moment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  @ViewChild(IonContent, {static:false}) content:IonContent;

  urlCheck: any;
  url: any;
  model: any = {};
  deliveryCharge = 20;
  instruction: any;
  location:any ;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkUrl();
    this.getModel();
  }

  getCart() {
    return Storage.get({ key: 'cart' });
  }

  async getModel() {
    let data: any = await this.getCart();
    this.location = {
      lat:17.433597, lng:78.501670, address:'secandrabad railway station'
    };
    if (data?.value) {
    //  this.model.icon = 'assets/img/empty.jpg';
      this.model = await JSON.parse(data.value);
      console.log(this.model);
      this.calculate();
    }
  }

  async calculate() {
    let item = this.model.items.filter((x) => x.quantity > 0);
    console.log('item: ', item);
    this.model.items = item;
    this.model.totalPrice = 0;
    this.model.totalItem = 0;
    this.model.deliveryCharge = 0;
    this.model.grandTotal = 0;
    item.forEach((element) => {
      this.model.totalItem += element.quantity;
      this.model.totalPrice +=
        parseFloat(element.price_tally) * parseFloat(element.quantity);
    });
    this.model.deliveryCharge = this.deliveryCharge;
    this.model.totalPrice = parseFloat(this.model.totalPrice).toFixed(2);
    this.model.grandTotal = (
      parseFloat(this.model.totalPrice) + parseFloat(this.model.deliveryCharge)
    ).toFixed(2);
    if (this.model.totalItem == 0) {
      this.model.totalItem = 0;
      this.model.totalPrice = 0;
      this.model.grandTotal = 0;
      await this.clearCart();
      this.model = null;
    }
    console.log('cart: ', this.model);
  }

  clearCart() {
    return Storage.remove({ key: 'cart' });
  }

  checkUrl() {
    let url: any = this.router.url.split('/');
    console.log('url: ', url);
    const spliced = url.splice(url.length - 2, 2); // /tabs/cart url.length - 1 - 1
    this.urlCheck = spliced[0];
    console.log('urlcheck: ', this.urlCheck);
    url.push(this.urlCheck);
    this.url = url;
    console.log(this.url);
  }

  getPreviousUrl() {
    return this.url.join('/');
  }

  quantityPlus(index) {
    try {
      
      if (!this.model.items[index].quantity || this.model.items[index].quantity == 0) {
        this.model.items[index].quantity = 1;
        this.calculate();
      } else {
        this.model.items[index].quantity += 1;
        this.calculate();
      }
    } catch (e) {
      console.log(e);
    }
  }

  quantityMinus(index) {
    try {
      if (this.model.items[index].quantity !== 0) {
        this.model.items[index].quantity -= 1;
      } else {
        this.model.items[index].quantity = 0;
      }
      this.calculate();
    } catch (e) {
      console.log(e);
    }
  }

  addAddress() {}

  changeAddress() {}

  makePayment() {
    try{
      const data = {
        restaurant_id : this.model.restaurant_id,
        rest : this.model.restaurant,
        order: JSON.stringify(this.model.items),
        time: moment().format('1111'),
        address: this.location,
        total:this.model.totalPrice,
        delivaryCharges : this.model.delivaryCharge,
        GrandTotal_incl_gst: this.model.grandTotal,
        Status: 'Created',
        paid: 'CoD'
      }
      console.log(data);
      
      
    }catch(e){
     
    }
  }


  scrollToBottom(){
   this.content.scrollToBottom(500);
  }
}





 //   urlCheck:any;
  //   url:any;
  //   model:any = {};
  //   delivaryCharge = 20;

  //   constructor(private router:Router) { }

  //   ngOnInit() {
  //    this.checkUrl();
  //    this.getmodel();
  //   }

  //   checkUrl(){
  //     let url : any = this.router.url.split('/');
  //    // console.log(url);
  //     const spliced = url.splice(url.length-2,2);
  //     this.urlCheck = spliced[0];
  //     url.push(this.urlCheck);
  //     this.url = url;
  //    // console.log(this.url);
  //   }

  //   async getCart(){
  //     const { value } = await Storage.get({ key: 'cart' });
  //    // console.log(JSON.parse(value));

  //     return JSON.parse(value);
  //   }

  //   getmodel(){

  //       this.model = this.getCart();
  //       if(this.model){
  //          this.calculate();
  //          console.log("here I am "+this.model);

  //       }
  //   }

  //   getPreviousUrl(){
  //     return this.url.join('/')
  //   }

  //   async calculate(){
  //     let item = this.model.items.filter((x) => x.quantity > 0);
  //     console.log(item);
  //     this.model.items = item;
  //     this.model.totalPrice = 0;
  //     this.model.totalItem = 0;
  //     console.log("here I am"+this.model.restaurant);
  //     this.model.deliveryCharge = 0;
  //     this.model.grandTotal = 0;
  //     item.forEach(element => {
  //       this.model.totalItem += element.quantity;
  //       this.model.totalPrice += (parseFloat(element.price) * parseFloat(element.quantity));
  //     });
  //     this.model.deliveryCharge = this.delivaryCharge;
  //     this.model.totalPrice = parseFloat(this.model.totalPrice).toFixed(2);
  //     this.model.grandTotal = (parseFloat(this.model.totalPrice) + parseFloat(this.model.deliveryCharge)).toFixed(2);
  //     if(this.model.totalItem == 0) {
  //       this.model.totalItem = 0;
  //       this.model.totalPrice = 0;
  //       this.model.grandTotal = 0;
  //       await this.clearCart();
  //       this.model = null;
  //     }
  //     console.log('cart: ', this.model);
  //   }

  //   clearCart(){
  //     Storage.remove({key:'cart'});
  //   }

  //   quantityPlus(index) {}

  //   quantityMinus(index) {}

  // }
