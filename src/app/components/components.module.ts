import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RestaurantComponent } from './restaurant/restaurant.component';




@NgModule({
  declarations: [RestaurantComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports:[
    RestaurantComponent
  ],
  entryComponents:[]
})
export class ComponentsModule { }
