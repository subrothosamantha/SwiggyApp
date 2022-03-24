import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { Key } from 'protractor';
import { ApiService } from 'src/app/services/api/api.service';

//const{Storage} = Plugins;
@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  constructor(private route: ActivatedRoute,
     private navCtrl: NavController,
     private router: Router,
     private api: ApiService
     ) {}

  uid: any;

  restaurants : any[] = [];
  categories: any[] = [];
  allItems :any[]= [];

  id: any;
  data: any = {};
  items: any[] = [];
  category: any[] = [];
  value: any = {};
  veg: boolean = false;
  cartData: any = [];
  storedData: any = {};
  isLoading:boolean;


 

  ngOnInit() {
    this.uid = this.route.queryParams;
    this.route.paramMap.subscribe((paramMap) => {
      // console.log(paramMap);

      this.restaurants = this.api.restaurantsItem;
      this.categories = this.api.categories;
      this.allItems = this.api.allItems;

      if (!paramMap.has('restaurantId')) {
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('restaurantId');
      this.getItems();
    });
  }

  async getCart() {
    const { value } = await Storage.get({ key: 'cart' });
    return value;
  }

  async getItems() {
    //this.id which is restaurant id i.e siya = 4 should match with category id so that we
    //can show relavent menu
    this.isLoading = true;
    this.data = {};
    this.cartData = {};
    this.storedData = {};
    // fetching perticular list from array of list which is being clicked
    setTimeout(async()=>{
    this.value = this.restaurants.filter((x) => x.uid == this.id);
    this.data = this.value[0];
    this.categories = this.categories.filter((x) => x.uid === this.id);
    // console.log(this.data);
    this.items = this.allItems.filter((x) => x.uid === this.id);
    let cart = await this.getCart();
    if (cart?.length) {
      this.storedData = JSON.parse(cart);
      console.log('storedData: ', this.storedData);
      if ( this.id == this.storedData.restaurant.uid && this.allItems.length > 0 ) {
        this.allItems.forEach((element: any) => {
          this.storedData.items.forEach((ele) => {
            if (element.id != ele.id) return;

            element.quantity = ele.quantity;
          });
        });
      }
      this.cartData.totalItem = this.storedData.totalItem;
      this.cartData.totalPrice = this.storedData.totalPrice;
    }
        this.isLoading = false;
      },2000);
    }
  

  vegOnly(event) {
    console.log(event.detail.checked);
    this.items = [];
    if (event.detail.checked == true)
      this.items = this.allItems.filter((x) => x.veg === true);
    else this.items = this.allItems;
  }

  quantityPlus( index) {
    try {
      
      if (!this.items[index].quantity || this.items[index].quantity == 0) {
        this.items[index].quantity = 1;
        this.calculate();
      } else {
        this.items[index].quantity += 1;
        this.calculate();
      }
    } catch (e) {
      console.log(e);
    }
  }

  quantityMinus(index) {
    try {
      if (this.items[index].quantity !== 0) {
        this.items[index].quantity -= 1;
      } else {
        this.items[index].quantity = 0;
      }
      this.calculate();
    } catch (e) {
      console.log(e);
    }
  }

  calculate() {
    // console.log(this.items);
    this.cartData.items = [];
    let item = this.items.filter((x) => x.quantity > 0);
    this.cartData.items = item;
    // console.log(item);
    this.cartData.totalPrice = 0;
    this.cartData.totalItem = 0;
    item.forEach((element) => {
      this.cartData.totalItem += element.quantity;
      this.cartData.totalPrice +=
        parseFloat(element.price_tally) * parseFloat(element.quantity);
    });
    this.cartData.totalPrice = parseFloat(this.cartData.totalPrice).toFixed(2);
    if (this.cartData.totalItem == 0) {
      this.cartData.totalPrice = 0;
      this.cartData.totalItem = 0;
    }
  }

  saveToCart() {
    try {
      this.cartData.restaurant = {};
      this.cartData.restaurant = this.data;
      //console.log(this.cartData);
      Storage.set({
        key: 'cart',
        value: JSON.stringify(this.cartData),
      });
    } catch (e) {}
  }

   async viewcart() {
    if(this.cartData.items && this.cartData.items.length > 0) await this.saveToCart();
    console.log('router url: ', this.router.url);
    this.router.navigate([this.router.url + '/cart']);
  }
}
