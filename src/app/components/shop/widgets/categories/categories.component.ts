import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { Produit } from 'src/app/modals/produit.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();

  @Input() product: Produit;

  constructor( public productsService: ProductService,  
    private dialog: MatDialog, private router: Router ) { 
    
  }
  list:any
  ngOnInit() {
    console.log(this.list)
    console.log(this.product)
  }



}
