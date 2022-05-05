import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/modals/product.model';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';
import { Produit } from './../../../modals/produit.model';
import { Avis } from 'src/app/modals/Avis.model';



// Get product from Localstorage
let products = JSON.parse(localStorage.getItem("compareItem")) || [];

@Injectable({
  providedIn: 'root'
})
export class AvisService {

  public currency : string = 'USD';
  public catalogMode : boolean = false;

  private _url: string = "assets/data/";
  public url = "assets/data/banners.json";

  public compareProducts : BehaviorSubject<Product[]> = new BehaviorSubject([]);
  public observer   :  Subscriber<{}>;

  constructor(private httpClient: HttpClient, public snackBar: MatSnackBar) {
   this.compareProducts.subscribe(products => products = products)
  }  
  readonly rootURL = 'https://localhost:44357/api';
  list : Produit[];

  ngOnInit() {
 
  }



  public banners(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.url);
  }


    // Get Banners
    public getBanners() {
      return this.banners();
    }


// Get Compare Products
public getComapreProducts(): Observable<Product[]> {
  const itemsStream = new Observable(observer => {
    observer.next(products);
    observer.complete();
  });
  return <Observable<Product[]>>itemsStream;
}

// If item is aleready added In compare
public hasProduct(product: Product): boolean {
  const item = products.find(item => item.id === product.id);
  return item !== undefined;
}

 // Add to compare
 public addToCompareAvis(avis: Avis): Avis | boolean {
  let message, status;
  var item: Avis | boolean = false;
  if (this.hasProduct(avis)) {
    item = products.filter(item => item.id === avis.id)[0];
    const index = products.indexOf(item);
    this.snackBar.open('The product  ' + avis.titre + ' already added to comparison list.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

  } else {
    if(products.length < 4)
      products.push(avis);
      message = 'The product ' + avis.titre + ' has been added to comparison list.';
      status = 'success';
      this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });

  }
    localStorage.setItem("compareItem", JSON.stringify(products));
    return item;
}

// Removed Product
public removeFromCompare(product: Product) {
  if (product === undefined) { return; }
  const index = products.indexOf(product);
  products.splice(index, 1);
  localStorage.setItem("compareItem", JSON.stringify(products));
}

  

}
