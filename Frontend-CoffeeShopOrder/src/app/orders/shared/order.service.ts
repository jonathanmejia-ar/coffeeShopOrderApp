import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderItem } from './order-item.model';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData: Order;
  orderItems: OrderItem[];

  //public toEdit: boolean = false;

  constructor(private http: HttpClient) { }

  saveOrder() {
    var body = {
      ...this.formData,
      OrderItem: this.orderItems
    };
    console.log(this.formData);
    return this.http.post(environment.apiURL + '/order/newOrder', body);
  }

  updateOrder(id: string) {
    var body = {
      ...this.formData,
      OrderItem: this.orderItems
    };
    console.log(this.formData);
    return this.http.put(environment.apiURL + '/order/updateOrder/' + id, body)
  }

  getOrderList() {
    return this.http.get(environment.apiURL + '/order/orderList').toPromise();
  }

  getOrderById(id: string): any {
    return this.http.get(environment.apiURL + '/order/getOrder/' + id).toPromise();
  }

  deleteOrder(id: string) {
    return this.http.delete(environment.apiURL + '/order/deleteOrder/' + id).toPromise();
  }
}
