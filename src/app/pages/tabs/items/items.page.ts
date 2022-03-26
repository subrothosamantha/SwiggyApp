import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';


import { ApiService } from 'src/app/services/api/api.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { StorageService } from 'src/app/services/storage/storage.service';


//const{Storage} = Plugins;
@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit,OnDestroy {
  constructor(private route: ActivatedRoute,
     private navCtrl: NavController,
     private router: Router,
     private api: ApiService,
     private cartService : CartService,
     private storageService : StorageService
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
  cartSub : Subscription;
  routeSub : Subscription;

 

  ngOnInit() {
    this.route.paramMap.pipe(take(1)).subscribe(paramMap => {
      console.log('route data: ', paramMap);
      if(!paramMap.has('restaurantId')) {
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('restaurantId');
      console.log('id: ', this.id);
    });
    this.cartSub = this.cartService.cart.subscribe(cart => {
      console.log('cart items: ', cart);
      this.cartData = {};
        this.storedData = {};
      if(cart && cart?.totalItem > 0) {
        
        this.storedData = cart;
        // this.cartData.items = this.storedData.items;
        this.cartData.totalItem = this.storedData.totalItem;
        this.cartData.totalPrice = this.storedData.totalPrice;

        //console.log('what inside all items '+ this.allItems)

        if(cart?.restaurant?.uid == this.id) {
          this.allItems.forEach(element => {
            cart.items.forEach(element2 => {
              if(element.id != element2.id) return;
              element.quantity = element2.quantity;
            });
          });
          console.log('allitems: ', this.allItems);
          this.cartData.items = this.allItems.filter(x => x.quantity > 0);
          if(this.veg == true) this.items = this.allItems.filter(x => x.veg === true);
          else this.items = [...this.allItems];
        }else {
          this.allItems.forEach(element => {            
              element.quantity = 0;
          });
          if(this.veg == true) this.items = this.allItems.filter(x => x.veg === true);
          else this.items = [...this.allItems];
        }
      } 
      // else {
      //   this.storedData = {};
      //   this.cartData = {};

      // }
    });    
    this.getItems();
  }

  async getCart() {
    const { value } = await this.storageService.getStorage('cart');
    return value;
  }

  async getItems() {
   
    try{
      
      this.isLoading = true;
      this.data = {};
      this.cartData = {};
      this.storedData = {};
      // fetching perticular list from array of list which is being clicked
      setTimeout(async()=>{
      this.allItems = this.api.allItems;
      this.value = this.api.restaurant1.filter((x) => x.uid == this.id);
      this.data = this.value[0];
      this.categories = this.api.categories.filter((x) => x.uid === this.id);
      // console.log(this.data);
      this.allItems = this.api.allItems.filter((x) => x.uid === this.id);
      this.items = [...this.allItems];

      await this.cartService.getCartData();

     
          this.isLoading = false;
        },2000);

    }catch(e){
      console.log(e);
      
    }
    }
  

  vegOnly(event) {
    console.log(event.detail.checked);
    this.items = [];
    if (event.detail.checked == true)
      this.items = this.allItems.filter((x) => x.veg === true);
    else this.items = this.allItems;
  }

  quantityPlus(item) {
    const index = this.allItems.findIndex(x => x.id === item.id);
    console.log('quantity plus index number '+index);
    
    console.log(index);
    if(!this.allItems[index].quantity || this.allItems[index].quantity == 0) {
      if(!this.storedData.restaurant || (this.storedData.restaurant && this.storedData.restaurant.uid == this.id)) {
        this.cartService.quantityPlus(index, this.allItems, this.data);
      } else {
        // alert for clear cart
        this.cartService.alertClearCart(index, this.allItems, this.data);
      }
    } else {
      this.cartService.quantityPlus(index, this.allItems, this.data);
    }  
  }

 async quantityMinus(item) {
  const index = this.allItems.findIndex(x => x.id === item.id);
  this.cartService.quantityMinus(index);
  }

  saveToCart() {
    try {
      this.cartData.restaurant = {};
      this.cartData.restaurant = this.data;
     // console.log('save cartData: ', this.cartData);
      this.cartService.saveCart();
    } catch(e) {
      console.log(e);
    }
    
  }

   async viewcart() {
    console.log('save cartdata: ', this.cartData);
    if(this.cartData.items && this.cartData.items.length > 0) await this.saveToCart();
    console.log('router url: ', this.router.url);
    
    
    this.router.navigate(['/','tabs','cart']);
  }

  async ionViewWillLeave() {
    console.log('ionViewWillLeave ItemsPage');
    if(this.cartData?.items && this.cartData?.items.length > 0) await this.saveToCart();
    // if(this.routeSub) this.routeSub.unsubscribe();
  }
  ngOnDestroy() {
    if(this.cartSub) this.cartSub.unsubscribe();
  }

}
