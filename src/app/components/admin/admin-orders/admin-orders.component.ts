import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders;


  constructor(private orderService: OrderService) {
   }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getOrders().snapshotChanges().pipe(
      map((actions: any) =>
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    ).subscribe(orders => {
      this.orders = orders;
    });
   }

}
