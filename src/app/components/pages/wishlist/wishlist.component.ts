import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/modals/product.model';
import { Produit } from 'src/app/modals/produit.model';
import { CartService } from '../../shared/services/cart.service';
import { WishlistService } from '../../shared/services/wishlist.service';
import { UserService } from '../../shared/user.shared';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.sass']
})
export class WishlistComponent implements OnInit {

  public product        :   Observable<Product[]> = of([]);
  wishlistItems  :   Product[] = [];
  formModel = {
    Email: '',
    Password: ''
  }
  constructor(private service: UserService,private cartService: CartService, private wishlistService: WishlistService,private router: Router) {
    this.product = this.wishlistService.getProducts();
    this.product.subscribe(products => this.wishlistItems = products);
  }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
    this.router.navigateByUrl('/pages/profile');
  this.service.formModel.reset();
  }
  

  onSubmitRegister() {
    this.service.register().subscribe(
      (res: any) => {
        //if (res.succeeded) {
          console.log("cc")

          console.log(res)
          this.service.formModel.reset();
   

          //this.toastr.success('New user created!', 'Registration successful.');
       /* } else {
          console.log('Email is already taken','Registration failed.');

          res.errors.forEach(element => {
            console.log("aa")

            switch (element.code) {
              case 'DuplicateEmail':
                console.log('Email is already taken','Registration failed.');
                break;

              default:
              console.log('Registration failed.');
                break;
            }
          });
        }*/
      },
      err => {
        console.log(err);
      }
    );
  }

   // Add to cart
 public addToCart(product: Produit,  quantity: number = 1) {
  if (quantity > 0)
   this.cartService.addToCart(product,quantity);
   this.wishlistService.removeFromWishlist(product);
}

// Remove from wishlist
public removeItem(product: Product) {
 this.wishlistService.removeFromWishlist(product);
}

}
