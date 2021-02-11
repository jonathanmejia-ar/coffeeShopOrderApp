import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr'
import { NbToastrModule, NbThemeModule, NbLayoutModule, NbButtonModule, NbSpinnerModule, NbCardModule, NbDialogModule, NbDialogRef } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppRoutingModule } from './app-routing.module';



//Routes
import { APP_ROUTING } from "./app.routing";

//Components
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { OrderItemsComponent } from './orders/order-items/order-items.component';

//Services
import { OrderService } from './orders/services/order.service';
import { LoadingComponent } from './shared/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderComponent,
    OrderItemsComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NbToastrModule.forRoot(),
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule,
    AppRoutingModule,
    NbButtonModule,
    NbSpinnerModule,
    NbCardModule,
    NbDialogModule.forRoot()
  ],
  entryComponents: [OrderItemsComponent],
  providers: [OrderService, OrderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
