import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  cartItemsCount;
  cartData;
  orderCost;


  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.getItemsFromCart();
    this.getOrderCost();
  }

  getItemsCount() {
    return this.cartItemsCount = this.shoppingCartService.shoppingCartItemCount;
  }
  getItemsFromCart() {
    this.shoppingCartService.getItemsFromCart();
    this.cartData = this.shoppingCartService.cartData;
  }

  getOrderCost() {
    setInterval(() => {
      this.orderCost = 0;
      this.cartData.items.forEach((item) => {
        this.orderCost += item.totalPrice;
      }, 1000)
    })
  }
}



