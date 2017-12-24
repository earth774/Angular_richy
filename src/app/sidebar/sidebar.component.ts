import { Component, OnInit } from '@angular/core';

declare var $:any;

export interface RouteInfo {
    path: string;
    path1:string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard',path1:'', title: 'Dashboard',  icon: 'ti-panel', class: '' },
    { path: 'tree_user',path1:'', title: 'จัดการสมาชิก',  icon:'ti-list', class: '' },
    // { path: 'table', title: 'Table List',  icon:'ti-view-list-alt', class: '' },
    { path: 'product',path1:'', title: 'สินค้า',  icon:'ti-package', class: '' },
    { path: 'user',path1:'', title: 'สมาชิก',  icon:'ti-user', class: '' },
    // { path: 'typography', title: 'Typography',  icon:'ti-pencil-alt2', class: '' },
    { path: 'order',path1:'', title: 'ดูสถานะการสั่งซื่อ',  icon:'ti-view-list-alt', class: '' },
    { path: 'report_month_year',path1: 'report_person', title: 'รายงานการสั่งซื้อ',  icon:'ti-clipboard', class: '' },
    { path: 'maps',path1:'', title: 'แผนที่',  icon:'ti-map', class: '' },
    { path: 'report',path1:'', title: 'ยืนยันการสั่งซื้อ',  icon:'ti-check-box', class: '' },
    { path: 'upgrade',path1:'', title: 'ออกจากระบบ',  icon:'ti-export', class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }
    logout(){
        console.log('aaa');
        localStorage.removeItem("user");
        window.location.href='http://localhost:4200/login';
      }

}
