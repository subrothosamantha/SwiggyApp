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
  categories:any[] = [];
  value:any = {};
  veg:boolean = false;
  constructor(private route:ActivatedRoute,
          private navCtrl:NavController) {
   }

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

    this.data = {};
    // fetching perticular list from array of list which is being clicked
    this.value = this.restaurants.filter(x=> x.uid == this.id);
    this.data = this.value[0];
   // console.log(this.data);
    
  }


  vegOnly(event){
    console.log(event.detail.checked);
    console.log(this.veg);
    
    
  }
}
