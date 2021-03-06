import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant.model';
import { ApiService } from 'src/app/services/api/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private api:ApiService) { }

  banner:any[] ;
  restaurants: Restaurant[]; 
  isLoading: boolean = false;

  ngOnInit() {
    this.isLoading = true;
    

    setTimeout(()=>{
      this.banner = this.api.banner;
      this.restaurants = this.api.restaurants;
      this.isLoading = false;
    },2000);
   
  }


}
