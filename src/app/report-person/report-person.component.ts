import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { OrderService } from '../order.service';
import { ExcelService } from '../excel.service';
@Component({
  selector: 'app-report-person',
  templateUrl: './report-person.component.html',
  styleUrls: ['./report-person.component.css']
})
export class ReportPersonComponent implements OnInit {
	continents;
	continents1;
	heroForm:FormGroup;
  searchForm:FormGroup;
	data;
	data1;
  data2:any=[];
  month=['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
  year=[];
  constructor(private orderService:OrderService,
    private fb:FormBuilder,
    private userService:UserService,
    private _sanitizer: DomSanitizer,
    private excelService:ExcelService,) { 
  	this.userService.getUser(undefined,'any','All').subscribe(hero=>{this.continents=hero;});
  	this.heroForm = this.fb.group({
  		continent:''
  	});
    this.searchForm = this.fb.group({
    month:'any',
    year:'any',
  });
  	this.data = {'user_image':'http://placehold.it/256x256',
  				'user_name':'██████████',
  				'user_province':'จังหวัด',
  				'user_username':'██████████',
  				'user_status':'██████████'};
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

  ngOnInit() {
  }
  onSearch(value:any){
    console.log(value);
    this.list(this.data.user_name,'any',value.month,value.year);
  }
  exportToExcel(value:any) {
    var a = this.list(this.data.user_name,'any',value.month,value.year);
      console.log(a);
      this.excelService.exportAsExcelFile(a, 'persons');
      
  }
  list(name,status,month,year){
    this.orderService.getReport(name,status,'All','any').subscribe(data=>{this.data1=data;
      let package_json=this.data1;
      let d1 = [];
      let d2 = [];
        for(let i of package_json){
          var da = new Date(i.order_date).getFullYear();
          var dam = new Date(i.order_date).getMonth();
          
          if(da==year||year=='any'){
            if(dam==month||month=='any'){
              d1.push(i);
            }else{
              d2 =[];
            }
          }
        }
        this.data2 = d1;
    });
    return this.data2;
  }

  autocompleListFormatter = (data: any) : SafeHtml => {
    let html = `<img src="${data.user_image}" width="30"><span>   </span><span>${data.user_name}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  onSubmit(data){
  	this.data = data.continent;
  	this.list(this.data.user_name,'any','any','any')
  	console.log(data.continent);
  }

}
