import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/modals/product.model';
import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../shared/services/cart.service';
import { Produit } from 'src/app/modals/produit.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AddAvisDialogComponent } from '../addAvis/AddAvisDialog.component';
import { UserService } from '../../shared/user.shared';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.sass']
})
export class CompareComponent implements OnInit {
  users:any;
  public product            :   Observable<Product[]> = of([]);
  public products           :   Product[] = [];
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  commandes;
  nbr;
  constructor(private productService: ProductService, private cartService: CartService,
    private dialog: MatDialog, private router: Router,private  userService:UserService) {

  }

  ngOnInit() {
    this.product = this.productService.getComapreProducts();
    this.product.subscribe(products => this.products = products);
    debugger
    console.log(this.product);
    this.userService.HistoriqueCommandes().subscribe(
      res => {
        debugger
        this.commandes = res;

        this.users = res;
        console.log(this.commandes)
        console.log(this.users)
        this.nbr=this.commandes.length;
    

      },
      err => {
        console.log(err);
      },
    );

  }

     // Add to cart
     public addToCart(product: Produit, quantity: number = 1) {
      this.cartService.addToCart(product, quantity);
   }

   // Remove from compare list
   public removeItem(product: Product) {
     this.productService.removeFromCompare(product);
   }
  
   public openProductDialog(a){
    let dialogRef = this.dialog.open(AddAvisDialogComponent, {
        data: a,
        panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(a => {
      if(a){
        this.router.navigate(['/pages/compare', a.id, a.titre]);
      }
    });
  }
}
