import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Report,Report_detail } from '../data-model';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-report-con',
  templateUrl: './report-con.component.html',
  styleUrls: ['./report-con.component.css']
})
export class ReportConComponent implements OnInit {
  confirm_data:number;
  data:Report[];
  data_detail:Report_detail[];
  constructor(private orderService:OrderService) { 
  	this.list();
  	$(document).ready(function(){
  		$('[data-toggle="tooltip"]').tooltip();
  	});
  }
  list(){
  	this.orderService.getReport_con().subscribe(data=>this.data=data);
  }
  ngOnInit() {
  }
  confirm(value){
  	this.confirm_data = value;

  }
  edit(){
  	console.log(this.confirm_data);
  	this.orderService.addUser(this.confirm_data).subscribe(data=>{
  		this.list();

  	});
  }
  Delete(value){
  	console.log(value);
  	this.orderService.getReport_con_detail(value).subscribe(data=>{this.data_detail=data});
  }

}
