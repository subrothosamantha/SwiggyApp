import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { LoadingRestaurantComponent } from './loading-restaurant/loading-restaurant.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';
import { RouterLink } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { ItemsPageRoutingModule } from '../pages/tabs/items/items-routing.module';
import { SearchLocationComponent } from './search-location/search-location.component';




@NgModule({
  declarations: [RestaurantComponent,
    LoadingRestaurantComponent,
    EmptyScreenComponent,
    SearchLocationComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemsPageRoutingModule
  ],
  exports:[
    RestaurantComponent,
    LoadingRestaurantComponent,
    EmptyScreenComponent,
    SearchLocationComponent
  ],
  //only those components not defined in template
  entryComponents:[SearchLocationComponent]
})
export class ComponentsModule { }
