import { Component, OnInit, ViewEncapsulation,ElementRef,ViewChild   } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { states } from '../data-model';
import { User,Province } from '../data-model';
declare var jquery:any;
declare var $ :any;
declare const google: any;
var geocoder;
var map;
var marker;
var map1;
interface marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}
export class User1 {
  
  constructor(public name: string) { }
}
@Component({
  selector: 'app-tree-user',
  templateUrl: './tree-user.component.html',
  styleUrls: ['./tree-user.component.css']
})
export class TreeUserComponent implements OnInit {
  data:any;
  data1:any;
  data2:any;
  @ViewChild('img3') img3;
  @ViewChild('img4') img4;
  @ViewChild('filess') filess;
  myImg:any;
  selectedFileName: string = null;
  basefile: any;
  imgdata:string;
  heroForm :FormGroup ;
  editForm:FormGroup;
  editdata:any;
  insertdata:any;
  s:number;
  line_image:string;
  states = states;
  continents:any;
  continents1:any;
  maps:string;
  lat:number;
  lng:number;
  selectedlatitude:number;
  selectedlongitude:number;

  delete_image:string;
  delete_id:number;
  province: Province[];
  amphur:any;
  amphur1:any;
  search_amphur;
  	constructor(private fb:FormBuilder,
private _sanitizer: DomSanitizer,private userService:UserService) { 
      this.userService.getProvince().subscribe(data=>this.province=data);
  		this.userService.lamdap('admin').subscribe(data=>this.data=data);
  		this.editForm = this.fb.group({
        name1: ['', Validators.required ],
        username1:['', Validators.required ],
        password1:['', Validators.required ],
        status1:['', Validators.required ],
        tel1:['', Validators.required ],
        facebook1:['', Validators.required ],
        email1:['', Validators.required ],
        address1:['', Validators.required ],
        province1:['', Validators.required ],
        amphur1:['', Validators.required ],
        continent1 : '',
        id:'',
        image:''
      });
    this.heroForm = this.fb.group({
        name: ['', Validators.required ],
        username:['', Validators.required ],
        password:['', Validators.required ],
        status:['', Validators.required ],
        tel:['', Validators.required ],
        facebook:['', Validators.required ],
        email:['', Validators.required ],
        address:['', Validators.required ],
        province:['', Validators.required ],
        amphur:['', Validators.required ],
        continent : '',
      });
	}
	onList(value){
		this.userService.lamdap(value).subscribe(data=>this.data1=data);
	}
	onList1(value){
		this.userService.lamdap(value).subscribe(data=>this.data2=data);
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
onSelectChange(e){
  this.userService.getautoUser(e.target.value).subscribe(hero=>{this.continents=hero;this.continents1=hero;});
}

  map(lat,lng){
    this.selectedlatitude=lat;
    this.selectedlongitude=lng;
      const myLatlng = new google.maps.LatLng(this.selectedlatitude, this.selectedlongitude);
      geocoder = new google.maps.Geocoder();
      const mapOptions = {
          zoom: 13,
          center: myLatlng,
          scrollwheel: true, // we disable de scroll over the map, it is a really annoing when you scroll through page
          disableDefaultUI: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
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
        // Adds a marker at the center of the map.
        // return {'lat':(this.lat==undefined)?lat:this.lat,'lng':(this.lng==undefined)?lat:this.lng}; 
      }
      map1(lat,lng){
        this.selectedlatitude=lat;
        this.selectedlongitude=lng;
        const myLatlng = new google.maps.LatLng(this.selectedlatitude, this.selectedlongitude);
        geocoder = new google.maps.Geocoder();
        const mapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: true, // we disable de scroll over the map, it is a really annoing when you scroll through page
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map1 = new google.maps.Map(document.getElementById('map1'), mapOptions);
      let marker = new google.maps.Marker({
            map: map1,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: myLatlng
          });
          var contentString = '<p>lat => '+lat+' </p>'+
                              '<p>lng => '+lng+'</p>';
          var infowindow = new google.maps.InfoWindow({
            content: contentString
          });

          // This event listener will call addMarker() when the map is clicked.
           marker.addListener('click', function() {
            infowindow.open(map1, marker);
            });
          map1.addListener('click', (event)=>{
            this.lat = event.latLng.lat();
            this.lng = event.latLng.lng();
            console.log(this.lat,this.lng);
            let latLng=event.latLng;
            marker.setMap(null);
            marker = new google.maps.Marker({
                map: map1,
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
              infowindow.open(map1, marker);
              });
            this.toggleBounce;

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

  ngOnInit() {
     this.editdata={'head':'',
       'name':'',
       'status':'',
       'image':'',
       'username':'',
       'password':'',
       'tel':'',
       'facebook':'',
       'email':''
     };
     this.insertdata ={
    	'status':'',
    	'head':''
    };
  }


  autocompleListFormatter = (data: any) : SafeHtml => {
    console.log(data);
    let html = `<span>${data.name}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  onSubmit(value:any){
    console.log(value);//$event.target.value.substring($event.target.value.indexOf("/")+2));
    this.userService.addUser(value,this.imgdata,(this.lat==undefined)?this.selectedlatitude:this.lat,(this.lng==undefined)?this.selectedlongitude:this.lng).subscribe(heroes => {console.log(heroes);
      this.userService.lamdap('admin').subscribe(data=>{this.data=data;
        this.data1=data;
        this.data2=data;});
      this.notifi("ti-check","ท่านได้ทำการเพิ่มข้อมูลสมาชิกเรียบร้อยแล้ว - <b>Richlybrownie</b> ",'success');
      this.heroForm.reset();
      this.imgdata='';
    });
  }
  onUpdate(value:any){
    console.log(value);
    this.userService.editUser(value,this.imgdata,this.line_image,(this.lat==undefined)?this.selectedlatitude:this.lat,(this.lng==undefined)?this.selectedlongitude:this.lng).subscribe(heroes => {console.log(heroes);
       this.userService.lamdap('admin').subscribe(data=>{this.data=data;
        this.data1=data;
        this.data2=data;});
       this.notifi("ti-pencil","ท่านได้ทำการแก้ไขข้อมูลสมาชิกเรียบร้อยแล้ว - <b>Richlybrownie</b>",'warning');
    });
  }
  onSearch(value:any){
  	console.log(value);
  	this.list((value.name!=='')?value.name:'undefined',value.status);
  }
  createForm(lat,lng,name,status,username) {
    this.imgdata ='' ;
    console.log(lat,lng,status,username);
    var status_data;
    if(status=='dealer'){
    	status_data='vip';
    }else if(status=='vip'){
    	status_data='gold';
    }
    this.insertdata ={
    	'status':status_data,
    	'head':name +' / '+ username
    };
    this.map1(lat,lng);
    $("#myModal").show('shown', function() { //You can replace "fast" with any other effect or time.
        google.maps.event.trigger(map1, "resize");
    });
  }

  list(name,status){
    // this.userService.getUser(name,status).subscribe(heroes => {this.heroes = heroes;console.log(this.heroes);});
  }
  notifi(icon,message,type){
    $.notify({
          icon: icon,
          message: message
        },{
            type: type,
            timer: 2000,
            placement: {
                from: 'bottom',
                align: 'left'
            }
        });
  }
  edit(name,status,head,image,id,username,password,tel,facebook,email,address,province,amphur,lat,lng){
     this.imgdata = image;
     this.line_image=image;
     this.s=1;
     this.editdata={'head':head,
       'name':name,
       'status':status,
       'image':image,
       'username':username,
       'password':password,
       'tel':tel,
       'facebook':facebook,
       'email':email,
       'address':address,
       'province':province,
       'amphur':amphur,
     };
     this.search_amphur=false;
     this.onAmphur(province);
     console.log(this.editdata);
     this.userService.getautoUser(status).subscribe(hero=>{this.continents1=hero;});
     this.map(lat,lng);
     $("#myModal1").show('shown', function() { //You can replace "fast" with any other effect or time.
        google.maps.event.trigger(map, "resize");
    });
     // $(function() {
     // $('#myModal1').on('shown', function () {
     //      google.maps.event.trigger(map, "resize");
     //  });
     //  });
  }
  delete_modal(id,image){
    this.delete_image=image;
    this.delete_id=id;
  }
  onDelete(){
    this.userService.deleteUser(this.delete_id,this.delete_image).subscribe(heroes => {console.log(heroes);
      this.notifi("ti-trash","ท่านได้ทำการลบข้อมูลสมาชิกเรียบร้อยแล้ว - <b>Richlybrownie</b>",'danger');
      this.userService.lamdap('admin').subscribe(data=>{this.data=data;
        this.data1=data;
        this.data2=data;});
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
        var img3 = this.img3.nativeElement;
        var img4 = this.img4.nativeElement;
        var myReader: FileReader = new FileReader();
        myReader.onloadend = (e: any) => {
        	console.log(e.target.result);
          img3.src = e.target.result;
          img4.src = e.target.result;
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

}

