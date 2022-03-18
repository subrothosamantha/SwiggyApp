import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {

  slideOptions = {
    slidesPerView:1.1
  }

  @Input() bannerImages:any[];

  constructor() { }

  ngOnInit() {}

}
