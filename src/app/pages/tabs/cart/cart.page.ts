import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { IonContent, NavController } from '@ionic/angular';
import { moveMessagePortToContext } from 'worker_threads';
import * as moment from 'moment';
import { GlobalService } from 'src/app/services/global/global.service';
import { OrderService } from 'src/app/services/order/order.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { Subscription } from 'rxjs';

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
  cartSub:Subscription;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private orderService:OrderService,
    private global: GlobalService,
    private cartService: CartService,
    
    ) {}

  ngOnInit() {
    this.cartSub = this.cartService.cart.subscribe(cart => {
      this.model = cart;
      if(!this.model)
         this.location = {};
    });
   /// this.checkUrl();
    this.getData();
  }

  getCart() {
    return Storage.get({ key: 'cart' });
  }

  async getData() {
    await this.checkUrl();
    this.location = {
      lat: 28.653831, 
      lng: 77.188257, 
      address: 'Karol Bagh, New Delhi'
    };
    await this.cartService.getCartData();
  }

  async calculate() {
    // 
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
    this.cartService.quantityPlus(index);
  }

  quantityMinus(index) {
    this.cartService.quantityMinus(index);
  }

  addAddress() {}

  changeAddress() {}

 async makePayment() {
    try{
      const data = {
        restaurant_id : this.model.restaurant_id,
        instruction : this.instruction? this.instruction : "no instruction",
        rest : this.model.restaurant,
        order: JSON.stringify(this.model.items),
        time: moment().format('1111'),
        address: this.location,
        total:this.model.totalPrice,
        delivaryCharges : this.model.delivaryCharge,
        GrandTotal_incl_gst: this.model.grandTotal,
        Status: 'Created',
        paid: 'CoD'
      };
      console.log(data);
      await this.orderService.placeOrder(data);
      //clearcart
      await this.cartService.clearCart();
      this.global.successToast('Your order is placed');
      this.navCtrl.navigateRoot(['tabs/account']);
    }catch(e){
     
    }
  }


  scrollToBottom(){
   this.content.scrollToBottom(500);
  }

  
  ionViewWillLeave() {
    console.log('ionViewWillLeave CartPage');
    if(this.model?.items && this.model?.items.length > 0) {
      this.cartService.saveCart();
    }
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
