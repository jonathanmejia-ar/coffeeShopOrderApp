
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { Customer } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';
import { OrderService } from '../services/order.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  customerList: Customer[];
  isValid: boolean = true;

  constructor(public service: OrderService,
    private dialog: MatDialog,
    private customerService: CustomerService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private nebularToastr: NbToastrService
  ) { }

  ngOnInit(): void {
    let orderID = this.currentRoute.snapshot.paramMap.get('id');
    if (orderID == null)
      this.resetForm();
    else {
      this.service.getOrderById(orderID).then(res => {
        this.service.formData = res.order;
        this.service.orderItems = res.orderItems;
        this.service.formData.orderID = orderID;
      });
    }
    this.customerService.getCustomerList().then(res => {
      this.customerList = res as Customer[];
      console.log(this.customerList)
    });

  };

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.service.formData = {
      orderID: '',
      orderNumber: Math.floor(100000 + Math.random() * 900000),
      customerID: 0,
      customerName: '',
      paymentMethod: '',
      totalAmount: 0,
      deletedOrderItemIDs: ''
    };
    this.service.orderItems = [];
  };

  addOrEditOrderItem(orderItemIndex, orderID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { orderItemIndex, orderID };
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res => {
      this.updagradeTotalAmount();
    });
  };

  onDeleteOrderItem(orderItemID: number, i: number) {
    if (orderItemID != null)
      this.service.formData.deletedOrderItemIDs += orderItemID + " ,";
    this.service.orderItems.splice(i, 1);
    this.updagradeTotalAmount();
  };

  updagradeTotalAmount() {
    this.service.formData.totalAmount = this.service.orderItems.reduce((prev, curr) => {
      return prev + curr.total;
    }, 0);
    this.service.formData.totalAmount = parseFloat((this.service.formData.totalAmount).toFixed(2));
  };

  validateForm() {
    this.isValid = true;
    if (this.service.formData.customerID == 0) {
      this.isValid = false;
    } else if (this.service.orderItems.length == 0) {
      this.isValid = false;
    } else if (this.service.formData.paymentMethod == '') {
      this.isValid = false;
    }
    return this.isValid;
  };

  onSubmit(form: NgForm) {
    console.log(form.value);
    let orderID = this.currentRoute.snapshot.paramMap.get('id');
    if (this.validateForm()) {
      this.service.formData.customerName = this.customerList[this.service.formData.customerID - 1].name;
      if (orderID) {
        this.service.updateOrder(orderID).subscribe(res => {
          this.resetForm();
          this.showToast('top-right', 'success', 'Updated Successfully');
          this.router.navigate(['/orders'])
        })
      } else {
        this.service.formData.customerName = this.customerList[this.service.formData.customerID - 1].name;
        this.service.saveOrder().subscribe(res => {
          this.resetForm();
          this.showToast('top-right', 'success', 'Submitted Successfully');
          this.router.navigate(['/orders']);
        });
      }
    }
  }
  showToast(position, status, title) {
    this.nebularToastr.show(
      'Coffee Shop App.',
      `${title}`,
      { position, status });
  }
};

