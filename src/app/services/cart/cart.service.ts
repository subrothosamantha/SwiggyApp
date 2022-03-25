import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  model: any={};
  delivaryCharges = 20;
  private _cart = new BehaviorSubject<any>(null);

  get cart(){
    return this._cart.asObservable();
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
      this.model = null;
    }
    console.log('cart: ', this.model);
  }

  clearCart() {
    
  }

  getCart(){
    return Storage.get({ key: 'cart' });
  }

 async getCartData(){
    let data: any = await this.getCart();
   
    if (data?.value) {
    //  this.model.icon = 'assets/img/empty.jpg';
      this.model = await JSON.parse(data.value);
      console.log(this.model);
      this.calculate();
    }
  }
}
