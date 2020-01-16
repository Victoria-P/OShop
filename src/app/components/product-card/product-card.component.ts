import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent  {
@Input('product') product;
@Input('show-actions') showActions = true;
@Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService, private db: AngularFireDatabase) { }

  addToCart(){
    this.cartService.addToCart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }

  getQuantity(){
    if(!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }
}
