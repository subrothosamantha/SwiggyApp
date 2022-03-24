import { Component, OnInit, ViewChild } from '@angular/core';
import { element } from 'protractor';
import { ApiService } from 'src/app/services/api/api.service';




@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private api: ApiService) { }

  @ViewChild('searchBar') sInput;
  allRestaurants: any[] = [];
  query : any;
  isLoading:boolean;

  restaurant: any[] = [];
  model:any = {
    icon:'search-outline',
    title:'no restaurant matching record'
  }

 

  ngOnInit() {
    setTimeout(()=>{
      this.allRestaurants = this.api.restaurants;
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
