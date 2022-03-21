import { Component, OnInit, ViewChild } from '@angular/core';
import { element } from 'protractor';




@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild('searchBar') sInput;
  allRestaurants: any[] = [
    {uid:4,banner:'assets/img/4.jpg',name:"Siya's Cafe",short_name:'siyascafe',cuisine:['Coffee','Cappuccino'],time:"5 Mins",price:"₹80/",rating:"5"},
    {uid:1,banner:'assets/img/3.jpg',name:"stayfit",short_name:'stayfit',cuisine:['Italian','Mexican'],time:"25 Mins",price:"₹200/",rating:"3"},
    {uid:2,banner:'assets/img/2.jpg',name:"Veggies Fresh",short_name:'veggiesfresh',cuisine:["French","Mexican"],time:"15 Mins",price:"₹150/"},
    {uid:3,banner:'assets/img/1.jpg',name:"Bread Toast",short_name:'bread-toast',cuisine:["French","Mexican"],time:"10 Mins",price:"₹100/"}
  ];
  query : any;
  isLoading:boolean;

  restaurant: any[] = [];
  model:any = {
    icon:'search-outline',
    title:'no restaurant matching record'
  }

  constructor() { }

  ngOnInit() {
    setTimeout(()=>{
      this.sInput.setFocus();
    },500)
  }

 async onSearchChange(event){
    
    this.query = event.detail.value.toLowerCase().replace(/ /g,'');
   
    if(this.query.length>0){
      this.isLoading = true;

      setTimeout(async()=>{
        this.restaurant = await this.allRestaurants.filter((element:any)=>{
            return element.short_name.includes(this.query);
        });
        this.isLoading = false;
      
      },2000);
      console.log(this.restaurant);
    }
  }
}
