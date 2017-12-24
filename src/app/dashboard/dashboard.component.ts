import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { DashboardService } from '../dashboard.service';
import { OrderService } from '../order.service';
import { Num_person,Report } from '../data-model';
declare var $:any;

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
    num_person:Num_person[];
    data:any;
    package:number;
    wallet:number;
    status:number;
    chart_day;
    chart_month;
    chart_year;
    year;
    top5;
    constructor(private dashboardService:DashboardService,
                private orderService:OrderService){
      this.dashboardService.getNum_User().subscribe(data=>this.num_person = data);
      this.dashboardService.getTop5('dealer').subscribe(data=>this.top5 = data);
      this.orderService.getReport(undefined,'any','All','any').subscribe(data=>{this.data=data;
        let package_json:any = this.data;
        var package_num=0;
        var wallet_num=0;
        var status = 0;
        for(let a in package_json){
          if (package_json[a].order_status==1) {
            package_num += package_json[a].order_num;
          }
        }
        for(let a in package_json){
          if (package_json[a].order_status==1) {
            var d = new Date(package_json[a].order_date);
            var d_now = new Date();
            var date = d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear();
            var date_now = d_now.getDate()+'-'+d_now.getMonth()+'-'+d_now.getFullYear();
            console.log(date , date_now);
            if(date == date_now){
              wallet_num += package_json[a].order_total;
            }
          }
        }
        for(let a in package_json){
          if (package_json[a].order_status==0) {
            status++;
          }
        }
        this.package = package_num;
        this.wallet = wallet_num;
        this.status = status;
        console.log(this.package);
        console.log(this.wallet);
        // console.log(package_json.length);
      });
        this.year=new Date();
    }
    status_top(e){
      this.dashboardService.getTop5(e.target.value).subscribe(data=>this.top5 = data);
    }
    data_e(e){
      
      if(e.target.value=='1'){
        console.log(e.target.value);
        this.dashboardService.getchart_day().subscribe(data=>{this.chart_day=data;
          var max_chart=0;
          for(let i in this.chart_day){
            for(let j in this.chart_day[i].data_num){
              if(max_chart<this.chart_day[i].data_num[j]){
                max_chart=this.chart_day[i].data_num[j];
                
              }
            }
          }
          var dataSales = {
            labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
            series: [
              [0],
              this.chart_day[0].data_num,
              [0],
              
            ]
          };
          var optionsSales = {
            low: 0,
            high: max_chart,
            showArea: true,
            height: "245px",
            axisX: {
              showGrid: false,
            },
            lineSmooth: Chartist.Interpolation.simple({
              divisor: 3
            }),
            showLine: true,
            showPoint: false,
          };

          var responsiveSales = [
            ['screen and (max-width: 640px)', {
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                }
              }
            }]
          ];

          Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);
        });
      }else if(e.target.value=='2'){
        console.log(e.target.value);
        this.dashboardService.getchart_week().subscribe(data=>{this.chart_day=data;
          var max_chart=0;
          for(let i in this.chart_day){
            for(let j in this.chart_day[i].data_num){
              if(max_chart<this.chart_day[i].data_num[j]){
                max_chart=this.chart_day[i].data_num[j];
                
              }
            }
          }
          
          this.chart_day[0].data_num.push(0);
          console.log(this.chart_day[0].data_num);
          var dataSales = {
            labels: [ 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์','เสาร์','อาทิตย์'],
            series: [
              [0],
              this.chart_day[0].data_num,
              [0],
              
            ]
          };
          var optionsSales = {
            low: 0,
            high: max_chart,
            showArea: true,
            height: "245px",
            axisX: {
              showGrid: false,
            },
            lineSmooth: Chartist.Interpolation.simple({
              divisor: 3
            }),
            showLine: true,
            showPoint: false,
          };

          var responsiveSales = [
            ['screen and (max-width: 640px)', {
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                }
              }
            }]
          ];

          Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);
        });
      }else if(e.target.value=='3'){
        this.dashboardService.getchart_month().subscribe(data=>{this.chart_day=data;
           var max_chart=0;
          for(let i in this.chart_day){
            for(let j in this.chart_day[i].data_num){
              if(max_chart<this.chart_day[i].data_num[j]){
                max_chart=this.chart_day[i].data_num[j];
                
              }
            }
          }
          var array_date=[]
          for (var i = 1; i <= this.chart_day[0].dateinMonth; i++) {
            array_date.push(i);
          }
          this.chart_day[0].data_num.shift()
          this.chart_day[0].data_num.push(0);
          console.log(this.chart_day[0].data_num);
          var dataSales = {
            labels: array_date,
            series: [
              [0],
              this.chart_day[0].data_num,
              [0],
              
            ]
          };
          var optionsSales = {
            low: 0,
            high: max_chart,
            showArea: true,
            height: "245px",
            axisX: {
              showGrid: false,
            },
            lineSmooth: Chartist.Interpolation.simple({
              divisor: 3
            }),
            showLine: true,
            showPoint: false,
          };

          var responsiveSales = [
            ['screen and (max-width: 640px)', {
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                }
              }
            }]
          ];

          Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);
        });
      }else if(e.target.value=='4'){
        this.dashboardService.getchart_year('admin').subscribe(data=>{this.chart_day=data;
          var max_chart=0;
          for(let i in this.chart_day){
            for(let j in this.chart_day[i].data_num){
              if(max_chart<this.chart_day[i].data_num[j]){
                max_chart=this.chart_day[i].data_num[j];
                
              }
            }
          }
          
          this.chart_day[0].data_num.push(0);
          console.log(this.chart_day[0].data_num);
          var dataSales = {
            labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
            series: [
              [0],
              this.chart_day[0].data_num,
              [0],
              
            ]
          };
          var optionsSales = {
            low: 0,
            high: max_chart,
            showArea: true,
            height: "245px",
            axisX: {
              showGrid: false,
            },
            lineSmooth: Chartist.Interpolation.simple({
              divisor: 3
            }),
            showLine: true,
            showPoint: false,
          };

          var responsiveSales = [
            ['screen and (max-width: 640px)', {
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                }
              }
            }]
          ];

          Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);
          });
      }
    }
    ngOnInit(){
      this.dashboardService.getchart_day().subscribe(data=>{this.chart_day=data;
        var max_chart=0;
        for(let i in this.chart_day){
          for(let j in this.chart_day[i].data_num){
            if(max_chart<this.chart_day[i].data_num[j]){
              max_chart=this.chart_day[i].data_num[j];
              
            }
          }
        }
        var dataSales = {
          labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
          series: [
            [0],
            this.chart_day[0].data_num,
            [0],
          ]
        };
        var optionsSales = {
          low: 0,
          high: max_chart,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false,
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: true,
          showPoint: false,
        };

        var responsiveSales = [
          ['screen and (max-width: 640px)', {
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

        Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);
        });

        this.dashboardService.getchart_year('admin').subscribe(data1=>{this.chart_year=data1;
          var data = {
            labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
            series: [
              
              [0],
              [0],
              this.chart_year[0].data_num,
            ]
          };

        var options = {
            seriesBarDistance: 10,
            axisX: {
                showGrid: false
            },
            height: "245px"
        };

        var responsiveOptions = [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

        Chartist.Line('#chartActivity', data, options, responsiveOptions);
        });
        // var dataPreferences = {
        //     series: [
        //         [25, 30, 20, 25]
        //     ]
        // };

        // var optionsPreferences = {
        //     donut: true,
        //     donutWidth: 40,
        //     startAngle: 0,
        //     total: 100,
        //     showLabel: false,
        //     axisX: {
        //         showGrid: false
        //     }
        // };

        // Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);
      // this.dashboardService.getchart_month().subscribe(data=>{this.chart_month=data;
      //   var sta = [];
      //   var persen = [];
      //   for(let i in this.chart_month){
      //     if(this.chart_month[i].data_persen!=0){
      //       sta.push(this.chart_month[i].data_persen+' %');
      //       persen.push(this.chart_month[i].data_persen);
      //     }
      //   }
        
      //   Chartist.Pie('#chartPreferences', {
      //     labels: sta,
      //     series: persen
      //   });
      // });
    }
}
