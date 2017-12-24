import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Chartist from 'chartist';
// import { Profile } from '../data-model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User,Province } from '../data-model';
import { DashboardService } from '../dashboard.service';
import { OrderService } from '../order.service';
declare const google: any;
declare var $:any;
var geocoder;
var marker;
var myLatlng;
interface marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  moduleId: module.id,
})
export class ProfileComponent implements OnInit {
  @ViewChild('img') img;
  @ViewChild('filess') filess;
  myImg:any;
  selectedFileName: string = null;
  imgdata:string;
  heroes:any;
  heroes1:any;
  heroForm :FormGroup ;
  lat:number;
  lng:number;
  selectedlatitude:number;
  selectedlongitude:number;
  continents:any;
  continents1:any;
  amphur:any;
  amphur1:any;
  search_amphur;
  province: any;
  chart_year;
  year;
  data1;
  status_date;
  data;
  b=[];
  a_1;
  data_detail;
  user;
  constructor(private fb:FormBuilder,
    private userService:UserService,
    private route: ActivatedRoute,
    private location: Location,
    private dashboardService:DashboardService,
    private orderService:OrderService,) { 
    this.user = this.route.snapshot.paramMap.get('user');
    
    
    
  	this.userService.listprofile(this.user).subscribe(heroes => {this.heroes = heroes;
      this.dashboardService.getchart_year(this.heroes[0].user).subscribe(data1=>{this.chart_year=data1;
          if(this.user=='admin'){
            this.list(undefined,'any');
          }else{
            this.list(this.heroes[0].name,'any');
          }
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

        Chartist.Line('#'+this.heroes[0].user, data, options, responsiveOptions);
        });
        this.onAmphur(this.heroes[0].province);
         console.log(this.heroes);
        this.heroForm = this.fb.group({
          name1: ['', Validators.required ],
          username1:['', Validators.required ],
          tel1:['', Validators.required ],
          facebook1:['', Validators.required ],
          email1:['', Validators.required ],
          address1:['', Validators.required ],
          province1:'',
          amphur1:'',
        });
    });
    this.userService.getProvince().subscribe(data=>{this.province=data;
      

    });

     
        this.map();
        this.year=new Date();
  }
  list(name,status){
    this.orderService.getReport(name,status,'All','any').subscribe(data=>{this.data1=data;
        this.data=[];
        let package_json:any = this.data1;
        var a;
        var a1;
        var b=[];
        for(a1 in package_json){
          if(a1%10==0){
            b.push(a1);
          }
        }
        for(let v in b){
          console.log(v)
          if(v=='0'){
            this.b.push({'page':v,'class':'page-item active'})
            this.a_1 = 0;
          }else{
            this.b.push({'page':v,'class':'page-item'})
          }
        }
        for(a in package_json){
          a = (a*1);
          if (a<10) {
            this.data.push(package_json[a]);
          }
        }


    });
  }

  ngOnInit(){
        

    }
    Delete(value){
    console.log(value);
    this.orderService.getReport_con_detail(value).subscribe(data=>{this.data_detail=data});
  }
    pagination(page){
      this.userService.listprofile(this.user).subscribe(heroes => {var hero = heroes;
        this.orderService.getReport((this.user=='admin')?undefined:hero[0].name,'any','All','any').subscribe(data=>{this.data1=data;
          this.data=[];
          let package_json:any = this.data1;

          var a;
          var a_1;
          var a1;
          var b=[];
          for(a1 in package_json){
            if(a1%10==0){
              b.push(a1);
            }
          }
          this.b = [];
          for(let v in b){
            console.log(v)
            if(v==page){
              this.b.push({'page':v,'class':'page-item active'})
              this.a_1 = b[page];
            }else{
              this.b.push({'page':v,'class':'page-item'})
            }
          }
          this.data=[];
          var last = (this.a_1*1)+11;
          for(a in package_json){

            if (((this.a_1*1)<a)&&(last>a)) {
              this.data.push(package_json[a]);
            }
          }
        });
      });
    }
  onAmphur(e){
    if(e.target===undefined){
      console.log(e);
      this.userService.getAmphur(e).subscribe(hero=>{this.amphur=hero; this.amphur1=hero;
        console.log(this.amphur1);
     });
    }else{
     console.log(e.target.value); 
     this.search_amphur=true;
     this.userService.getAmphur(e.target.value).subscribe(hero=>{this.amphur=hero; this.amphur1=hero;
     
     });
    }
  }
 
  onSubmit(img){
  	console.log(this.heroForm.value,this.imgdata,img,(this.lat==undefined)?this.selectedlatitude:this.lat,(this.lng==undefined)?this.selectedlongitude:this.lng);
    this.userService.profile (this.heroForm.value,(this.imgdata!=undefined)?this.imgdata:img,img,(this.lat==undefined)?this.selectedlatitude:this.lat,(this.lng==undefined)?this.selectedlongitude:this.lng).subscribe(data1=>{console.log(data1)});
    $.notify({
          icon: "ti-pencil",
          message: "ท่านได้ทำการแก้ไขข้อมูลสมาชิกเรียบร้อยแล้ว - <b>Richlybrownie</b>"
        },{
            type: 'warning',
            timer: 2000,
            placement: {
                from: 'bottom',
                align: 'left'
            }
        });
  }

  propagateChange = (_: any) => { };
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched() { }

 changeListener($event): void {
        // debugger; // uncomment this for debugging purposes
        // this.readThis($event.target);
        this.readThis();
    }
 readThis(): void {
        // debugger; // uncomment this for debugging purposes
        var inputFile = this.filess.nativeElement;

        var file: File = inputFile.files[0];
        console.log(file);
        var img = this.img.nativeElement;
        var myReader: FileReader = new FileReader();
        myReader.onloadend = (e: any) => {
          img.src = e.target.result;
          this.imgdata= e.target.result;
          this.propagateChange(myReader.result);
          this.selectedFileName = file.name;
        }

        // this.basefile = myReader;
        myReader.readAsDataURL(file);
    }
    


    
    onClickUpload() {
      document.getElementById('uploadFile').click();
    }

    map(){
    this.userService.listprofile('admin').subscribe(heroes => {this.heroes1 = heroes;
      this.selectedlatitude = this.heroes[0].user_lat;
      this.selectedlongitude = this.heroes[0].user_lng;
      myLatlng = new google.maps.LatLng(this.selectedlatitude, this.selectedlongitude);
      geocoder = new google.maps.Geocoder();

      const mapOptions = {
          zoom: 17,
          center: myLatlng,
          scrollwheel: true, // we disable de scroll over the map, it is a really annoing when you scroll through page
          disableDefaultUI: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      const map = new google.maps.Map(document.getElementById('map'), mapOptions);
      console.log(map);
    let marker = new google.maps.Marker({
          map: map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: myLatlng
        });
        var contentString = '<p>lat => 40.748817 </p>'+
                            '<p>lng => -73.985428</p>';
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        // This event listener will call addMarker() when the map is clicked.
         marker.addListener('click', function() {
          infowindow.open(map, marker);
          });
        map.addListener('click', (event)=>{
          this.lat = event.latLng.lat();
          this.lng = event.latLng.lng();
          console.log(this.lat,this.lng);
          let latLng=event.latLng;
          marker.setMap(null);
          marker = new google.maps.Marker({
              map: map,
              draggable: true,
              animation: google.maps.Animation.DROP,
              position: latLng
            });
          var contentString = '<p>lat => '+this.lat+'</p>'+
                              '<p>lng => '+this.lng+'</p>';
          var infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          marker.addListener('click', function() {
            infowindow.open(map, marker);
            });
          this.toggleBounce;

      });
    });
      
      
        // Adds a marker at the center of the map.
        // return {'lat':(this.lat==undefined)?lat:this.lat,'lng':(this.lng==undefined)?lat:this.lng}; 
      }
      toggleBounce() {
            if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
      }


}

