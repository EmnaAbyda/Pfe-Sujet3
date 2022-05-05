import { Product } from './product.model';
import { Produit } from './produit.model';

// cart items
export interface CartItem {
  product: Produit;
  quantity: number;
}
