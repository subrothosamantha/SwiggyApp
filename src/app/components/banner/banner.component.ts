import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {

  slideOptions = {
    slidesPerView:1.1
  }

  bannerImages:any[] =[{banner:'assets/img/1.jpg'},{banner:'assets/img/2.jpg'},
                {banner:'assets/img/3.jpg'}];

  constructor() { }

  ngOnInit() {}

}
