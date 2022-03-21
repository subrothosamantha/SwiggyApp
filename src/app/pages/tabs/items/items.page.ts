import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  constructor(private route:ActivatedRoute,
    private navCtrl:NavController) {
}

  uid:any;
  restaurants = [
    {uid:4,banner:'assets/img/4.jpg',name:"Siya's Cafe",address:'South-west block sector 11,varanasi,uttar pradesh',short_name:'siyscafe',cuisine:['Coffee','Cappuccino'],time:"5 Mins",price:"₹80/",rating:"5/5"},
    {uid:1,banner:'assets/img/3.jpg',name:"stayfit",address:'South-west block sector 11,varanasi,uttar pradesh',short_name:'stay_fit',cuisine:['Italian','Mexican'],time:"25 Mins",price:"₹200/",rating:"3"},
    {uid:2,banner:'assets/img/2.jpg',name:"Veggies Fresh",address:'South-west block sector 11,varanasi,uttar pradesh',short_name:'veggies_fresh',cuisine:["French","Mexican"],time:"15 Mins",price:"₹150/"},
    {uid:3,banner:'assets/img/1.jpg',name:"Bread Toast",address:'South-west block sector 11,varanasi,uttar pradesh',short_name:'bread-toast',cuisine:["French","Mexican"],time:"10 Mins",price:"₹100/"}
 ];
  id:any;
  data: any = {};
  items:any[] = [];
  category:any[] = [];
  value:any = {};
  veg:boolean = false;
  cartData:any = [] ;
  


   categories: any[] = [
    {
      id: "e00",
      name: "Coffee",
      uid: "4"
    },
    {
      id: "e0",
      name: "Cappuccino",
      uid: "4"
    },
    {
      id: "e000",
      name: "Doughnut",
      uid: "4"
    },
  ]; 

  allItems = [
    {
        category_id: "e00",
        cover: "assets/img/creamy.jpg",
        desc: "Refreshing ",
        id: "i1",
        name: "Creamy coffee",
        price: "₹120/",
        price_tally:120.00,
        rating: 4,
        status: true,
        uid: "4",
        variation: true,
        veg: false
    },
    {
        category_id: "e0",
        cover: "assets/img/cap.jpg",
        desc: "Cooling Crisp",
        id: "i2",
        name: "Cappuccino",
        price: "₹120/",
        price_tally:120.00,
        rating: 0,
        status: true,
        uid: "4",
        variation: false,
        veg: true
    },
    {
        category_id: "e00",
        cover: "assets/img/black.jpg",
        desc: "Great in taste",
        id: "i3",
        name: "Black Coffee",
        price: "₹80/",
        price_tally:80.00,
        rating: 0,
        status: true,
        uid: "4",
        variation: false,
        veg: false
    },
    {
      category_id: "e000",
      cover: "assets/img/d2.jpg",
      desc: "Sweet in taste",
      id: "i4",
      name: "Daughnuts",
      price: "₹100.50/",
      price_tally:100.50,
      rating: 0,
      status: true,
      uid: "4",
      variation: false,
      veg: false
  },
  {
    category_id: "e000",
    cover: "assets/img/d1.jpg",
    desc: "Sweet in taste",
    id: "i5",
    name: "Daughnuts",
    price: "₹100/",
    price_tally:100.00,
    rating: 0,
    status: true,
    uid: "4",
    variation: false,
    veg: false
},
  ];


  ngOnInit() {
    this.uid = this.route.queryParams;
    this.route.paramMap.subscribe(paramMap => {
     // console.log(paramMap);
      
     if(!paramMap.has('restaurantId')){
       this.navCtrl.back();
       return;
     }
     this.id = paramMap.get('restaurantId');
     this.getItems()
      
    })
  }


  getItems(){
   //this.id which is restaurant id i.e siya = 4 should match with category id so that we
   //can show relavent menu
    
    this.data = {};
    this.cartData = {};
    // fetching perticular list from array of list which is being clicked
    this.value = this.restaurants.filter(x=> x.uid == this.id);
    this.data = this.value[0];
    this.categories = this.categories.filter(x=>x.uid === this.id);
   // console.log(this.data);
     this.items = this.allItems.filter(x=>x.uid === this.id);
    
  }


  vegOnly(event){
    console.log(event.detail.checked);
    this.items = [];
    if(event.detail.checked == true)
     this.items = this.allItems.filter(x => x.veg === true);
     else
     this.items = this.allItems;
    
    
  }

  quantityPlus(item,index){
     try{
        //console.log(item);
       // console.log(this.items[index]);
       // console.log(item);
       if(!this.items[index].quantity || this.items[index].quantity == 0){
         this.items[index].quantity = 1;
         this.calculate();
       }else{
         this.items[index].quantity += 1;
         this.calculate();
       }
        
     }catch(e){
       console.log(e);
     }
  }

  quantityMinus(item,index){
   try{
    if(this.items[index].quantity !== 0){
      this.items[index].quantity -= 1;
    }else{
      this.items[index].quantity = 0;
    }
    this.calculate();
   }catch(e){
     console.log(e);
     
   }
  }


  calculate(){
  // console.log(this.items);
   this.cartData.items = [];
   let item = this.items.filter(x => x.quantity > 0);
   this.cartData.items = item;
  // console.log(item);
   this.cartData.totalPrice = 0;
   this.cartData.totalItem = 0;
   item.forEach(element => {
     this.cartData.totalItem += element.quantity;
     this.cartData.totalPrice += parseFloat(element.price_tally) * parseFloat(element.quantity);
   });
   this.cartData.totalPrice = parseFloat(this.cartData.totalPrice).toFixed(2);
   if(this.cartData.totalItem == 0){
     this.cartData.totalPrice = 0;
     this.cartData.totalItem = 0;
   }
   
  }

  saveToCart(){
    try{
        this.cartData.restaurant = {};
        this.cartData.restaurant = this.data;
        console.log(this.cartData);
        // Plugins.Storage.set({
        //   key:'cart',
        //   value: JSON.stringify(this.cartData)
        // });
    }catch(e){

    }
  }

 async viewcart(){
      if(this.cartData.items && this.cartData.items.length > 0) await
        this.saveToCart();
       // this.router.navigate([this.router.url+'/cart'])
      
  }
}


