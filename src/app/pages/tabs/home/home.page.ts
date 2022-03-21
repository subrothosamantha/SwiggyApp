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
        {uid:4,banner:'assets/img/4.jpg',name:"Siya's Cafe",address:'South-west block sector 11,varanasi,uttar pradesh',short_name:'siyscafe',cuisine:['Coffee','Cappuccino'],time:"5 Mins",price:"₹80/",rating:"5"},
        {uid:1,banner:'assets/img/3.jpg',name:"stayfit",address:'South-west block sector 11,varanasi,uttar pradesh',short_name:'stay_fit',cuisine:['Italian','Mexican'],time:"25 Mins",price:"₹200/",rating:"3"},
        {uid:2,banner:'assets/img/2.jpg',name:"Veggies Fresh",address:'South-west block sector 11,varanasi,uttar pradesh',short_name:'veggies_fresh',cuisine:["French","Mexican"],time:"15 Mins",price:"₹150/"},
        {uid:3,banner:'assets/img/1.jpg',name:"Bread Toast",address:'South-west block sector 11,varanasi,uttar pradesh',short_name:'bread-toast',cuisine:["French","Mexican"],time:"10 Mins",price:"₹100/"}
      ];
      this.isLoading = false;
    },/**yaha timer jayega */);
   
  }


}
