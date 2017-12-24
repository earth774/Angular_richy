import { Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { OrderComponent } from './order/order.component';
import { ReportConComponent } from './report-con/report-con.component';
import { TreeUserComponent } from './tree-user/tree-user.component';
import { ReportMonthYearComponent } from './report-month-year/report-month-year.component';
import { ReportPersonComponent } from './report-person/report-person.component';

export var AppRoutes: Routes;
if(localStorage.getItem("user")){
    AppRoutes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'profile/:user',
        component: ProfileComponent
    },
    {
        path: 'table',
        component: TableComponent
    },
    {
        path: 'typography',
        component: TypographyComponent
    },
    {
        path: 'icons',
        component: IconsComponent
    },
    {
        path: 'maps',
        component: MapsComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    },
    {
        path: 'upgrade',
        component: UpgradeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'product',
        component: ProductComponent
    },
    {
        path: 'user',
        component: UserComponent
    },{
        path: 'order/:user',
        component: OrderComponent
    },{
        path: 'order',
        component: OrderComponent
    },{
        path: 'report',
        component: ReportConComponent
    },{
        path: 'tree_user',
        component: TreeUserComponent
    },{
        path: 'report_month_year',
        component: ReportMonthYearComponent
    },{
        path: 'report_person',
        component: ReportPersonComponent
    }
]
}else{
    AppRoutes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        component: LoginComponent 
    }
    ]
}
