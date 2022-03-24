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

 addresses = [      
  {address: "Fancy Bazaar, India", house: "2nd Floor", id: "7Kox63KlggTvV7ebRKar", landmark: "Fancy Bazar", lat: 26.1830738, lng: 91.74049769999999, title: "Fancy", user_id: "1"},
  {address: "Kanuat palace, India", house: "Ground Floor", id: "8Kox63KlggTvV7ebRKar", landmark: "Bazar", lat: 26.1830738, lng: 91.74049769999999, title: "Work", user_id: "1"}
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

orders = [
  {
    address: {address: "Indira Nagar Rd, Borsojai, Basistha 781029, India", house: "dsgd", id: "cLQdnS8YXk5HTDfM3UQC", landmark: "fdgs", lat: 26.108991978867923, lng: 91.79069981213378, title: "yui", user_id: "UA5JWxgjDOYgfXe92H0pFHwulTz2" }, 
    deliveryCharge: 20,
    grandTotal: "540.00",
    id: "5aG0RsPuze8NX00B7uRP",
    order: [
      {category_id: "e10", cover: "assets/imgs/baha.jpg", desc: "Great in taste", id: "i32", name: "Bahamas", price: 270, quantity: 1, rating: 0, status: true, uid: "r5", variation: false, veg: false},
      {category_id: "e10", cover: "assets/imgs/mofo.jpg", desc: "Great in taste", id: "i33", name: "Mofongo", price: 250, quantity: 1, rating: 0, status: true, uid: "r5",variation: false, veg: true}
    ],
    paid: "COD",  
    restaurant: {address: "Christan Basti, India",  city: "909090567", closeTime: "21:00", cover: "", cuisines: ["Caribbean food", "North Indian", "Vietnamese"], delivery_time: 25, description: "dd", email: "DosaPlaza@gmail.com", latitude: 26.1286243, longitude: 91.8012675, id: "r5", isClose: true, name: "DosaPlaza", openTime: "07:00", phone: 6619563867, price: 27, rating: 4.7, short_name: "stayfit", status: "open", totalRating: 13},
    restaurant_id: "r5",  
    status: "created",
    time: "Jul 6, 2020 11:44 AM",
    total: "520.00",
    user_id: "1"
  },
  {
    address: {address: "Indira Nagar Rd, Borsojai, Basistha 781029, India", house: "dsgd", id: "cLQdnS8YXk5HTDfM3UQC", landmark: "fdgs", lat: 26.108991978867923, lng: 91.79069981213378, title: "yui", user_id: "UA5JWxgjDOYgfXe92H0pFHwulTz2" }, 
    deliveryCharge: 20,
    grandTotal: "440.00",
    id: "5aG0RsPuze8NX00B7uR1",
    order: [
      {category_id: "e00", cover: "assets/imgs/pizza.jpg", desc: "Great in taste", id: "i1", name: "Pizza", price: 120, quantity: 1, rating: 0, status: true, uid: "r1", variation: false, veg: false},
      {category_id: "e00", cover: "assets/imgs/pasta.jpg", desc: "Great in taste", id: "i3", name: "Pasta", price: 150, quantity: 2, rating: 0, status: true, uid: "r1", variation: false, veg: false}
    ],
    paid: "COD",  
    restaurant: {address: "Beltola Tiniali, India", city: "909090271", closeTime: "20:00", cover: "assets/imgs/restaurant-1.jpg", cuisines: ["Italian", "Mexican"], delivery_time: 25, description: "dd", email: "stay@fit.com", id: "r1", isClose: true, latitude: 26.1286243, longitude: 91.8012675, name: "Stayfit", openTime: "08:00", phone: 6786745745, price: 25, rating: 0, short_name: "stayfit", status: "open", totalRating: 0},    restaurant_id: "r1",  
    status: "Delivered",
    time: "Jul 7, 2020 11:44 AM",
    total: "420.00",
    user_id: "1"
  },
]

}
