import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { take } from 'rxjs/operators';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
public shoppingCartItemCount;
public cartData = { items: []};

  constructor(private db: AngularFireDatabase) { }

  create(){
    return this.db.list('/shopping-carts/').push({
      dateCreated: new Date().getTime()
    })
  }

  async getCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges();
  }

  private async getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if(!cartId){
      let result = await this.create();
      localStorage.setItem('cartId', result.key)
      return result.key;
    } else { return cartId; } 
  }

  async addToCart(product){
      this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product){
    this.updateItemQuantity(product, -1);
  }

  async clearCart() { 
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }


  private async updateItemQuantity(product, change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
    item$ 
    .valueChanges()
    .pipe(take(1))
    .subscribe((item: any) => {
      if(item){
        let quantity = item.quantity + change;
        item$.update({ product: product, quantity: quantity, totalPrice: quantity * item.product.price }); 
      } else  {
        item$.set({ product: product, quantity: change, totalPrice: product.price });
      }
   });
  }
  
  async getItemsFromCart(){
    let cart$ = await this.getCart();
    cart$.subscribe((cart: any) => {
      this.shoppingCartItemCount = 0;
      this.cartData.items = [];
      for(let productId in cart.items) {
        this.shoppingCartItemCount += cart.items[productId].quantity; 
        this.cartData.items.push(cart.items[productId]);
      }
    })
  }

}
