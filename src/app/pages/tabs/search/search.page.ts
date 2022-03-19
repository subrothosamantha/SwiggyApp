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
    {banner:'assets/img/3.jpg',dish:"stayfit",short_name:'stayfit',cuisine:['Italian','Mexican'],time:"25 Mins",price:"₹200/",rating:"3"},
    {banner:'assets/img/2.jpg',dish:"Veggies Fresh",short_name:'veggiesfresh',cuisine:["French","Mexican"],time:"15 Mins",price:"₹150/"},
    {banner:'assets/img/1.jpg',dish:"Bread Toast",short_name:'breadtoast',cuisine:["French","Mexican"],time:"10 Mins",price:"₹100/"}
  ];
  query : any;
  isLoading:boolean;

  restaurant: any[] = [];

  constructor() { }

  ngOnInit() {
    setTimeout(()=>{
      this.sInput.setFocus();
    },500)
  }

  onSearchChange(event){
    console.log(event.detail.value);
    this.query = event.detail.value.toLowerCase();
    if(this.query.length>0){
      this.restaurant = this.allRestaurants.filter((element:any)=>{
          return element.short_name.includes(this.query);
      });
      console.log(this.restaurant);
    }
  }
}
