import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  subscription: Subscription;
  products = [];
  sortedData;

  constructor(private productService: ProductService) {
    this.sortedData = this.products.slice();
  }


  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts().snapshotChanges().pipe(
      map((actions: any) =>
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    ).subscribe(products => {
      this.sortedData = this.products = products;
    });
  }

  sortData(sort: Sort) {
    const data = this.products.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title': return this.compare(a.title, b.title, isAsc);
        case 'author': return this.compare(a.author, b.author, isAsc);
        case 'category': return this.compare(a.category, b.category, isAsc);
        case 'price': return this.compare(a.price, b.price, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
