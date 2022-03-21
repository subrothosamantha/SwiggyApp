import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { LoadingRestaurantComponent } from './loading-restaurant/loading-restaurant.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';




@NgModule({
  declarations: [RestaurantComponent,LoadingRestaurantComponent,EmptyScreenComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports:[
    RestaurantComponent,
    LoadingRestaurantComponent,
    EmptyScreenComponent
  ],
  entryComponents:[]
})
export class ComponentsModule { }
