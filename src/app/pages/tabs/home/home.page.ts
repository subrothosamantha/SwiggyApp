import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  banner:any[];
  restaurants: any[]; 
  isLoading: boolean = false;
  

  constructor() { }

  ngOnInit() {
    this.isLoading = true;
    setTimeout(()=>{
      this.banner = [{banner:'assets/img/1.jpg'},{banner:'assets/img/2.jpg'},
      {banner:'assets/img/3.jpg'}];
  
      this.restaurants = [
        {banner:'assets/img/3.jpg',dish:"stayfit",cuisine:['Italian','Mexican'],time:"25 Mins",price:"₹200/",rating:"3"},
        {banner:'assets/img/2.jpg',dish:"Veggies Fresh",cuisine:["French","Mexican"],time:"15 Mins",price:"₹150/"},
        {banner:'assets/img/1.jpg',dish:"Bread Toast",cuisine:["French","Mexican"],time:"10 Mins",price:"₹100/"}
      ];
      this.isLoading = false;
    },2000);
   
  }


}
