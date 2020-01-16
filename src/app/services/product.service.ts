import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product){
    return this.db.list('/products').push(product);
  }

  getAllProducts(){
    return this.db.list('/products');
  }
  getCategories(){
    return this.db.list('/categories');
  }

  getProduct(productId){
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product){
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }
}
