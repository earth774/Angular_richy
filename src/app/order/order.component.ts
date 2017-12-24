import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Report,Report_detail } from '../data-model';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
	data:any=[];
	data_detail:Report_detail[];
  searchForm:FormGroup;
  data1;
  status_date;
  province;
  constructor(private userService:UserService,private fb:FormBuilder,private orderService:OrderService,
    private route: ActivatedRoute,
    private location: Location,) { 
    this.userService.getProvince().subscribe(data=>this.province=data);
    this.status_date = this.route.snapshot.paramMap.get('user');
  	this.list(undefined,'any','All');
  	$(document).ready(function(){
  		$('[data-toggle="tooltip"]').tooltip();
  	});
    this.searchForm = this.fb.group({
      name:'',
      status:'any',
      location:'All'
    });
  }

    ngOnInit(){
    }
    onSearch(value:any){
    console.log(value);
      this.list((value.name!=='')?value.name:'undefined',value.status,value.location);
    }
    list(name,status,location){
    this.orderService.getReport(name,status,location,'any').subscribe(data=>{this.data1=data;
      if(this.status_date=='today'){
        this.data=[];
        let package_json:any = this.data1;
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
        this.data=this.data1;
      }
      

    });
  }
    Delete(value){
  	console.log(value);
  	this.orderService.getReport_con_detail(value).subscribe(data=>{this.data_detail=data});
  }

}
