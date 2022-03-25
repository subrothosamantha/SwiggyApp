import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { GlobalService } from '../global/global.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private storageService:StorageService,
    private global:GlobalService,
    private storage:StorageService,
    private router: Router
    ) { }

  model: any={};
  delivaryCharges = 20;
  private _cart = new BehaviorSubject<any>(null);

  get cart(){
    return this._cart.asObservable();
  }

  alertClearCart(index, items, data, order?) {
    this.global.showAlert(
      order ? 
      'Would you like to reset your cart before re-ordering from this restaurant?' 
      : 
      'Your cart contain items from a different restaurant. Would you like to reset your cart before browsing the restaurant?',
      'Items already in Cart',
      [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            return;
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.clearCart();
            this.model = {};
            if(order) {
              this.orderToCart(order);
            } else this.quantityPlus(index, items, data);
          }
        }
      ]
    )
  }

  async orderToCart(order) {
    console.log('order: ', order);
    const data = {
      restaurant: order.restaurant,
      items: order.order
    };
    this.model = data;
    await this.calculate();
    this.saveCart();
    console.log('model: ', this.model);
    this._cart.next(this.model);
    this.router.navigate(['/', 'tabs', 'restaurants', order.restaurant_id]);
  } 
  
 async quantityPlus(index,items?,restaurant?) {
    try {
      if(items) this.model.items = [...items];
      if(restaurant) {
        this.model.restaurant = {}; 
        this.model.restaurant = restaurant; 
      }
      console.log('q plus: ', this.model.items[index]);
      if (!this.model.items[index].quantity || this.model.items[index].quantity == 0) {
        this.model.items[index].quantity = 1;
        this.calculate();
      } else {
        this.model.items[index].quantity += 1;
      }
      await this.calculate();
      this._cart.next(this.model);
      
    } catch (e) {
      console.log(e);
      throw(e);
    }
  }

 

 async quantityMinus(index) {
   console.log('inside cart service');
   console.log('printing model '+this.model.items[index]);
   
  try {
    if(this.model.items[index].quantity !== 0) {
      this.model.items[index].quantity -= 1; // this.model.items[index].quantity = this.model.items[index].quantity - 1
    } else {
      this.model.items[index].quantity = 0;
    }
    await this.calculate();
    this._cart.next(this.model);
  } catch(e) {
    console.log(e);
    throw(e);
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
    this.model.deliveryCharge = this.delivaryCharges;
    this.model.totalPrice = parseFloat(this.model.totalPrice).toFixed(2);
    this.model.grandTotal = (
      parseFloat(this.model.totalPrice) + parseFloat(this.model.deliveryCharge)
    ).toFixed(2);
    if (this.model.totalItem == 0) {
      this.model.totalItem = 0;
      this.model.totalPrice = 0;
      this.model.grandTotal = 0;
      await this.clearCart();
      this.model = {};
    }
    console.log('cart: ', this.model);
  }

 async clearCart() {
    this.global.showLoader();
    await this.storageService.removeStorage('cart');
    this._cart.next(null);
    this.global.hideLoader();
  }

  getCart(){
   return this.storageService.getStorage('cart');
 }

 async getCartData(){
    let data: any = await this.getCart();
   
    if (data?.value) {
    //  this.model.icon = 'assets/img/empty.jpg';
      this.model = await JSON.parse(data.value);
      console.log(this.model);
      await this.calculate();
      this._cart.next(this.model);
    }
  }

  saveCart(model?) {
    if(model) this.model = model;
    this.storage.setStorage('cart', JSON.stringify(this.model));
    // this._cart.next(this.model);
  }
}
