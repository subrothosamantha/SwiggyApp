import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  banner = [{banner:'assets/img/1.jpg'},{banner:'assets/img/2.jpg'},
  {banner:'assets/img/3.jpg'}];

  restaurants = [
    {uid:4,banner:'assets/img/4.jpg',name:"Siya's Cafe",short_name:'siyascafe',cuisine:['Coffee','Cappuccino'],time:"5 Mins",price:"₹80/",rating:"5"},
    {uid:1,banner:'assets/img/3.jpg',name:"stayfit",short_name:'stayfit',cuisine:['Italian','Mexican'],time:"25 Mins",price:"₹200/",rating:"3"},
    {uid:2,banner:'assets/img/2.jpg',name:"Veggies Fresh",short_name:'veggiesfresh',cuisine:["French","Mexican"],time:"15 Mins",price:"₹150/"},
    {uid:3,banner:'assets/img/1.jpg',name:"Bread Toast",short_name:'bread-toast',cuisine:["French","Mexican"],time:"10 Mins",price:"₹100/"}
 ];

 restaurantsItem = [
  {
    uid: 4,
    banner: 'assets/img/4.jpg',
    name: "Siya's Cafe",
    address: 'South-west block sector 11,varanasi,uttar pradesh',
    short_name: 'siyscafe',
    cuisine: ['Coffee', 'Cappuccino'],
    time: '5 Mins',
    price: '₹80/',
    rating: '5/5',
  },
  {
    uid: 1,
    banner: 'assets/img/3.jpg',
    name: 'stayfit',
    address: 'South-west block sector 11,varanasi,uttar pradesh',
    short_name: 'stay_fit',
    cuisine: ['Italian', 'Mexican'],
    time: '25 Mins',
    price: '₹200/',
    rating: '3',
  },
  {
    uid: 2,
    banner: 'assets/img/2.jpg',
    name: 'Veggies Fresh',
    address: 'South-west block sector 11,varanasi,uttar pradesh',
    short_name: 'veggies_fresh',
    cuisine: ['French', 'Mexican'],
    time: '15 Mins',
    price: '₹150/',
  },
  {
    uid: 3,
    banner: 'assets/img/1.jpg',
    name: 'Bread Toast',
    address: 'South-west block sector 11,varanasi,uttar pradesh',
    short_name: 'bread-toast',
    cuisine: ['French', 'Mexican'],
    time: '10 Mins',
    price: '₹100/',
  },
];

categories: any[] = [
  {
    id: 'e00',
    name: 'Coffee',
    uid: '4',
  },
  {
    id: 'e0',
    name: 'Cappuccino',
    uid: '4',
  },
  {
    id: 'e000',
    name: 'Doughnut',
    uid: '4',
  },
];

allItems = [
  {
    category_id: 'e00',
    cover: 'assets/img/creamy.jpg',
    desc: 'Refreshing ',
    id: 'i1',
    name: 'Creamy coffee',
    price: '₹120/',
    price_tally: 120.0,
    rating: 4,
    status: true,
    uid: '4',
    variation: true,
    veg: false,
  },
  {
    category_id: 'e0',
    cover: 'assets/img/cap.jpg',
    desc: 'Cooling Crisp',
    id: 'i2',
    name: 'Cappuccino',
    price: '₹120/',
    price_tally: 120.0,
    rating: 0,
    status: true,
    uid: '4',
    variation: false,
    veg: true,
  },
  {
    category_id: 'e00',
    cover: 'assets/img/black.jpg',
    desc: 'Great in taste',
    id: 'i3',
    name: 'Black Coffee',
    price: '₹80/',
    price_tally: 80.0,
    rating: 0,
    status: true,
    uid: '4',
    variation: false,
    veg: false,
  },
  {
    category_id: 'e000',
    cover: 'assets/img/d2.jpg',
    desc: 'Sweet in taste',
    id: 'i4',
    name: 'Daughnuts',
    price: '₹100.50/',
    price_tally: 100.5,
    rating: 0,
    status: true,
    uid: '4',
    variation: false,
    veg: false,
  },
  {
    category_id: 'e000',
    cover: 'assets/img/d1.jpg',
    desc: 'Sweet in taste',
    id: 'i5',
    name: 'Daughnuts',
    price: '₹100/',
    price_tally: 100.0,
    rating: 0,
    status: true,
    uid: '4',
    variation: false,
    veg: false,
  },
];

}
