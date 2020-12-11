import { Routes, RouterModule } from '@angular/router';

//Components routes
import { OrderComponent } from './orders/order/order.component';
import { OrdersComponent } from './orders/orders.component';

const appRoutes: Routes = [
    { path: '', component: OrderComponent },
    { path: 'orders', component: OrdersComponent },
    {
        path: 'order',
        children: [
            { path: '', component: OrderComponent },
            { path: 'edit/:id', component: OrderComponent },
        ],
    }
];

export const APP_ROUTING = RouterModule.forRoot(appRoutes);
