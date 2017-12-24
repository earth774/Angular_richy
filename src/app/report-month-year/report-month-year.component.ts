import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ExcelService } from '../excel.service';
import { Report,Report_detail } from '../data-model';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
declare var jquery:any;
declare var $ :any;
declare function escape(s:string): string;
@Component({
  selector: 'app-report-month-year',
  templateUrl: './report-month-year.component.html',
  styleUrls: ['./report-month-year.component.css']
})
export class ReportMonthYearComponent implements OnInit {
data:any=[];
	data_detail:Report_detail[];
  searchForm:FormGroup;
  data1;
  status_date;
  province;
  month=['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
  year=[];
  constructor(private fb:FormBuilder,
    private orderService:OrderService,
    private excelService:ExcelService,
    private route: ActivatedRoute,
    private location: Location,
    private userService:UserService) { 
    this.userService.getProvince().subscribe(data=>this.province=data);
    this.status_date = this.route.snapshot.paramMap.get('user');
  	this.list(undefined,'any','All','any','any','any');
  	$(document).ready(function(){
      
      $('[data-toggle="tooltip"]').tooltip();
    });
    this.searchForm = this.fb.group({
      name:'',
      status:'any',
      location:'All',
      order_status:'any',
      month:'any',
      year:'any'
    });
    this.orderService.getReport(undefined,'any','All','any').subscribe(data=>{var a =data;
      var d = new Date().getFullYear();
      var date_min=d;
      for(let i in a){
        var date = new Date(a[i].order_date);
        var a_date = date.getFullYear();
        if(date_min>a_date){
          date_min = a_date;
        }
        
      }
      for(let i=date_min;i<=d;i++){
        this.year.push(i);
      }
    });
  }
  exportToExcel(value:any) {
    var a = this.list((value.name!=='')?value.name:'undefined',value.status,value.location,value.order_status,value.month,value.year);
      console.log(a);
      this.excelService.exportAsExcelFile(a, 'persons');
      
  }
    ngOnInit(){
    }
    onSearch(value:any){
    console.log(value);
      this.list((value.name!=='')?value.name:'undefined',value.status,value.location,value.order_status,value.month,value.year);
    }
    list(name,status,location,order_status,month,year){
    this.orderService.getReport(name,status,location,order_status).subscribe(data=>{this.data1=data;
  // });
      let package_json:any = this.data1;
      this.data=[];
      if(this.status_date=='today'){
        
        
        for(let a in package_json){
          if (package_json[a].order_status==1) {
            console.log(package_json);
            var d = new Date(package_json[a].order_date);
            var d_now = new Date();
            var date = d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear();
            var date_now = d_now.getDate()+'-'+d_now.getMonth()+'-'+d_now.getFullYear();
            console.log(date , date_now);
            if(date == date_now){
              this.data.push(package_json[a]);
            }
          }
        }

      }else{
        let package_json=this.data1;
        for(let i of package_json){
          var da = new Date(i.order_date).getFullYear();
          var dam = new Date(i.order_date).getMonth();
          if(da==year||year=='any'){
            if(dam==month||month=='any'){
              this.data.push(i);
            }
          }
        }
       
      }


    });
    return this.data;
  }
    Delete(value){
  	console.log(value);
  	this.orderService.getReport_con_detail(value).subscribe(data=>{this.data_detail=data});
  }
  

}

