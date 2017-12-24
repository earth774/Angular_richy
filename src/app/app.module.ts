import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';



import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { NguiMapModule} from '@ngui/map';



import { DashboardComponent }   from './dashboard/dashboard.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
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
// Service
import { UserService } from './user.service';
import { ProductService } from './product.service';
import { DashboardService } from './dashboard.service';
import { OrderService } from './order.service';
import { ExcelService } from './excel.service';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    LoginComponent,
    ProfileComponent,
    ProductComponent,
    UserComponent,
    OrderComponent,
    ReportConComponent,
    TreeUserComponent,
    ReportMonthYearComponent,
    ReportPersonComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    Ng2AutoCompleteModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBr-tgUtpm8cyjYVQDrjs8YpZH7zBNWPuY'})

  ],
  providers: [UserService,ProductService,DashboardService,OrderService,ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
