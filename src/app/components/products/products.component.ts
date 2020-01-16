import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import {map} from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy{
  products = [];
  filteredProducts = [];

  category;
  cart: any;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
    ) {
      

    this.productService.getAllProducts().snapshotChanges().pipe(
      map((actions: any) =>
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    ).subscribe(products => {
      this.filteredProducts = this.products = products;
    });


    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ? 
      this.products.filter(p => p.category === this.category) : this.filteredProducts

      if(!this.category) this.filteredProducts = this.products;
    })
  }

  ngOnInit(){
    this.shoppingCartService.getCart().then(obs => {
      this.subscription = obs.subscribe(cart => this.cart = cart);
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

// 