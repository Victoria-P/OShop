import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.scss']
})
export class ShoppingCartSummaryComponent implements OnInit {
  orderCost;
  cartItemsCount;
  cartData;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.getItemsFromCart();
    this.getOrderCost();
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

  getItemsCount() {
    return this.cartItemsCount = this.shoppingCartService.shoppingCartItemCount;
  }
}
