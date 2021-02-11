import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { OrderComponent } from './order/order.component';
import { OrderService } from './services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  loading: boolean = true;
  orderList;
  idRemove: any;

  constructor(private service: OrderService,
    private router: Router,
    public _order: OrderComponent,
    private nebularToastr: NbToastrService,
    private dialogService: NbDialogService
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.service.getOrderList().then(res => {
      this.loading = false;
      this.orderList = res;
    })
  }

  openForEdit(orderID: number) {
    this.router.navigate(['/order/edit/' + orderID]);
  }

  onOrderDelete(id: string) {
    this.service.deleteOrder(id).then(res => {
      this.refreshList();
      this.showToast('top-right', 'warning', 'Deleted Successfully');
    });

  }
  showToast(position, status, title) {
    this.nebularToastr.show(
      'Coffee Shop App.',
      `${title}`,
      { position, status });
  }

  open(dialog: TemplateRef<any>, index) {
    this.idRemove = index;
    this.dialogService.open(dialog).onClose.subscribe((data) => {
      if (data === 'remove') {
        this.onOrderDelete(index);
      }
    });
  }


}
