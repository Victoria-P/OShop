import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products = [];
  filteredProducts = [];

  category;

  constructor(
    route: ActivatedRoute,
    private productService: ProductService) {
    productService.getAll().valueChanges().subscribe(products => this.filteredProducts = this.products = products);

    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ? 
      this.products.filter(p => p.category === this.category) : this.filteredProducts

      if(!this.category) this.filteredProducts = this.products;
    })

    
  }
}
