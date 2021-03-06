import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.sass']
})
export class PriceComponent implements OnInit {


  public priceFrom: number = 1;
  public priceTo: number = 5000;
  // Using Output EventEmitter
  @Output() priceFilters = new EventEmitter();

  // define min, max and range
  public min : number = 1;
  public max : number = 5000;
  public range = [1,5000];

  constructor() { }

  ngOnInit() {  }

  // rangeChanged
  priceChanged(event:any) {
    setInterval(() => {
      this.priceFilters.emit(event);
    }, 1000);
  }

  priceFilter() {
    this.priceFilters.emit({
      priceFrom: this.priceFrom,
      priceTo: this.priceTo
    });
  }
}
