import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/modals/product.model';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';
import { Produit } from './../../../modals/produit.model';



// Get product from Localstorage
let products = JSON.parse(localStorage.getItem("compareItem")) || [];

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  formData: Produit= {
    id :null,
    nom: null,
    description: null,
    prix: null,
    image: null,
    prixHorsTaxe: null,
    categorie: null,
    prixNet: null,
    prixBrute: null,
  };
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


  addProduit() {
    return this.httpClient.post(this.rootURL + '/Produit', this.formData);
  }
  updateProduit() {
    return this.httpClient.put(this.rootURL + '/Produit/'+ this.formData.id, this.formData);
  }
  deleteProduit(id) {
    return this.httpClient.delete(this.rootURL + '/Produit/'+ id);
    // this.refreshList();
  }

  getProduits(){
    this.httpClient.get(this.rootURL + '/Produit')
    .toPromise()
    .then(res => this.list = res as Produit[]);
  }

  private products(): Observable<Produit[]> {
    return this.httpClient.get<Produit[]>(this.rootURL + '/Produit')
  
  }
  private categories(): Observable<String[]> {
    return this.httpClient.get<String[]>(this.rootURL + '/Produit/categorie')
  
  }

  public banners(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.url);
  }


    // Get Banners
    public getBanners() {
      return this.banners();
    }

    // Get Banners
    public getProducts(): Observable<Produit[]> {
      return this.products();
    }
    // Get categories
  
    public getCategories(): Observable<Produit> {
      return this.products().pipe(map(items => {
        return items.find((item: Produit) =>
          { return item.categorie  });
        }));
      // return this.products.find(product=> product.id === id);
  
      // return this.httpClient.get<Product>(this._url + 'product-' + id + '.json');
    }
  

      // Get Products By Id
  public getProduct(id: number): Observable<Product> {
    return this.products().pipe(map(items => {
      return items.find((item: Product) =>
        { return item.id === id; });
      }));
    // return this.products.find(product=> product.id === id);

    // return this.httpClient.get<Product>(this._url + 'product-' + id + '.json');
  }


        /*
      ---------------------------------------------
      ----------  Compare Product  ----------------
      ---------------------------------------------
   */

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
 public addToCompare(product: Produit): Produit | boolean {
  let message, status;
  var item: Produit | boolean = false;
  if (this.hasProduct(product)) {
    item = products.filter(item => item.id === product.id)[0];
    const index = products.indexOf(item);
    this.snackBar.open('The product  ' + product.nom + ' already added to comparison list.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

  } else {
    if(products.length < 4)
      products.push(product);
      message = 'The product ' + product.nom + ' has been added to comparison list.';
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

   // Get Products By category
   public getProductByCategory(category: string): Observable<Produit[]> {
    return this.products().pipe(map(items =>
       items.filter((item: Produit) => {
         if(category == 'all')
            return item
            else
            return item.categorie === category;

       })
     ));
  }

}
