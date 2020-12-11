import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderComponent } from './order/order.component';
import { OrderService } from './shared/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderList;

  constructor(private service: OrderService,
    private router: Router,
    private toastr: ToastrService,
    public _order: OrderComponent) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.service.getOrderList().then(res => this.orderList = res)
  }

  openForEdit(orderID: number) {
    this.router.navigate(['/order/edit/' + orderID]);
  }

  onOrderDelete(id: string) {

    if (confirm('Are you sure to delete this?')) {

      this.service.deleteOrder(id).then(res => {
        this.refreshList();
        this.toastr.warning("Deleted Successfully", "Coffee Shop App.");
      });
    }
  }
}
