import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { Router } from '@angular/router';
import { Produit } from 'src/app/modals/produit.model';
import { Avis } from 'src/app/modals/Avis.model';

@Component({
  selector: 'app-avis-dialog',
  templateUrl: './avisDialog.component.html',
  styleUrls: ['./avisDialog.component.sass']
})
export class AvisDialogComponent implements OnInit {

  //public products           :   Produit[] = [];
  public counter            :   number = 1;
  public variantImage       :   any = '';
  public selectedColor      :   any = '';
  public selectedSize       :   any = '';
  public test:any;
  constructor(private router: Router, public productsService: ProductService, private cartService: CartService, public dialogRef: MatDialogRef<AvisDialogComponent>, @Inject(MAT_DIALOG_DATA) public avis: Avis) { 
    this.test=avis
  }
  ngOnInit(): void {
  }

  

  public close(): void {
    this.dialogRef.close();
  }

  public increment() {
    this.counter += 1;
  }

  public decrement() {
    if(this.counter >1){
       this.counter -= 1;
    }
  }

   numSequence(n: number): Array<number> {
    return Array(n);
  }
}
