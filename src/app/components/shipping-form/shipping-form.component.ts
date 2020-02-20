import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  cart;
  shipping = {};
  userId: string;
  userSubscription: Subscription;
  cartSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService) { }


  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {
    let order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: Object.values(this.cart.items).map((i: any) => {
        return {
          product: {
            author: i.product.author,
            category: i.product.category,
            title: i.product.title,
            imageUrl: i.product.imageUrl,
            price: i.product.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        }
      })
    }
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success/', result.key]);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }

}
