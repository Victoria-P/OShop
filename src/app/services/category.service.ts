import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(){
    return this.db
    .list('/categories', ref => ref.orderByChild('name'))
    .snapshotChanges()
    .pipe(map(metadata => metadata.map((data: any) => ({ key: data.payload.key, ...data.payload.val() }))));
  }
}
