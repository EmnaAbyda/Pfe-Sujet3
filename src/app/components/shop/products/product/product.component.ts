import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { WishlistService } from 'src/app/components/shared/services/wishlist.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Product } from 'src/app/modals/product.model';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { Produit } from 'src/app/modals/produit.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {

  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Input() product: Produit;
  
  list:any;
  constructor(private cartService: CartService, public productsService: ProductService, private wishlistService: WishlistService, private dialog: MatDialog, private router: Router ) { }

  ngOnInit() {
  }


  populateForm(pd: Produit) {
    this.productsService.formData = Object.assign({}, pd);
  }
     public addToCart(product: Produit,  quantity: number = 1) {
      this.cartService.addToCart(product,quantity);
      console.log(product, quantity);
    }

    public addToWishlist(product: Product) {
      this.wishlistService.addToWishlist(product);
   }

    public addToCompare(product: Produit) {
      this.productsService.addToCompare(product);
   }

  public openProductDialog(product){
    

    let dialogRef = this.dialog.open(ProductDialogComponent, {
        data: product,
        panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(product => {
      console.log(this.product)
      if(product){
        this.router.navigate(['/products', product.id, product.nom]);
      }
    });
  }

}
