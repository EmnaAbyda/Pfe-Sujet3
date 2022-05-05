import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/modals/cart-item';
import { ProductService } from '../../shared/services/product.service';
import { UserService } from '../../shared/user.shared';
import {  SwiperDirective } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Produit } from 'src/app/modals/produit.model';
import { Avis } from 'src/app/modals/Avis.model';
import { AvisService } from '../../shared/services/avis.service';
import { ProductDialogComponent } from '../../shop/products/product-dialog/product-dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AvisDialogComponent } from '../avisDialog/AvisDialog.component';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {

  public cartItems: Observable<CartItem[]> = of([]);
  public buyProducts: CartItem[] = [];
  livreurs ;
  users:any;
  uniqueData:any;
  livreursUsers:any;
  amount: number;
  payments: string[] = ['Cash on delivery?', 'Cash on delivery?'];
  paymantWay: string[] = ['Cash on delivery', 'Credit card payment'];
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();

 @Input('product') product: Array<Produit> = [];
 public config: SwiperConfigInterface = {};

  constructor(private cartService: CartService, public avisService: AvisService,public productService: ProductService,private userService : UserService,
    private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.cartItems.subscribe(products => this.buyProducts = products);
    this.getTotal().subscribe(amount => this.amount = amount);
    
    this.userService.getAllLivreur().subscribe(
      res => {
        this.livreurs = res;

        this.users = res;
        console.log(this.users)
     
       /* for (var i = 0; i < this.users.length; i++) {
          
          if (!this.livreursUsers.includes(this.users[i])){
            this.livreursUsers.Add(this.users[i].applicationUser,this.users[i].avis)

          }
          }
          console.log(this.livreursUsers)*/

      },
      err => {
        console.log(err);
      },
    );
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }
  ngAfterViewInit(){
    this.config = {
      observer: true,
      slidesPerView: 4,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },


      }
    }
  }
  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
    }
    public addToCompare(avis: Avis) {
      this.avisService.addToCompareAvis(avis);

   }
   public openProductDialog(a){
    let dialogRef = this.dialog.open(AvisDialogComponent, {
        data: a,
        panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(a => {
      if(a){
        this.router.navigate(['/pages/checkout', a.id, a.titre]);
      }
    });
  }
}
