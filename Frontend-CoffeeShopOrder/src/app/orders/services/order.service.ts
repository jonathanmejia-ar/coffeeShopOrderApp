import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderItem } from '../models/order-item.model';
import { Order } from '../models/order.model';

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
    return this.http.post(environment.apiURL + '/orders/createOrder', body);
  }

  updateOrder(id: string) {
    var body = {
      ...this.formData,
      OrderItem: this.orderItems
    };
    return this.http.put(environment.apiURL + '/orders/updateOrder/' + id, body)
  }

  getOrderList() {
    return this.http.get(environment.apiURL + '/orders/getOrders').toPromise();
  }

  getOrderById(id: string): any {
    return this.http.get(environment.apiURL + '/orders/getOrder/' + id).toPromise();
  }

  deleteOrder(id: string) {
    return this.http.delete(environment.apiURL + '/orders/deleteOrder/' + id).toPromise();
  }
}
