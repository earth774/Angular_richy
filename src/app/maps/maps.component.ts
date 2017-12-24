import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

declare const google: any;
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  marker:any;
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.map('any');
  }
  status_map(e){
    console.log(e.target.value);
    this.map(e.target.value);
  }
  map(data){
    const myLatlng = new google.maps.LatLng(19.91292688975165, 99.83139038085938);
      const mapOptions = {
          zoom: 7,
          center: myLatlng,
          scrollwheel: true, // we disable de scroll over the map, it is a really annoing when you scroll through page
          // styles: [
          //     {'featureType': 'water', 'stylers': [{'saturation': 43}, {'lightness': -11}, {'hue': '#0088ff'}]},
          //     {'featureType': 'road', 'elementType': 'geometry.fill', 'stylers': [{'hue': '#ff0000'},
          //     {'saturation': -100}, {'lightness': 99}]},
          //     {'featureType': 'road', 'elementType': 'geometry.stroke', 'stylers': [{'color': '#808080'},
          //     {'lightness': 54}]},
          //     {'featureType': 'landscape.man_made', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ece2d9'}]},
          //     {'featureType': 'poi.park', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ccdca1'}]},
          //     {'featureType': 'road', 'elementType': 'labels.text.fill', 'stylers': [{'color': '#767676'}]},
          //     {'featureType': 'road', 'elementType': 'labels.text.stroke', 'stylers': [{'color': '#ffffff'}]},
          //     {'featureType': 'poi', 'stylers': [{'visibility': 'off'}]},
          //     {'featureType': 'landscape.natural', 'elementType': 'geometry.fill', 'stylers': [{'visibility': 'on'},
          //     {'color': '#b8cb93'}]},
          //     {'featureType': 'poi.park', 'stylers': [{'visibility': 'on'}]},
          //     {'featureType': 'poi.sports_complex', 'stylers': [{'visibility': 'on'}]},
          //     {'featureType': 'poi.medical', 'stylers': [{'visibility': 'on'}]},
          //     {'featureType': 'poi.business', 'stylers': [{'visibility': 'simplified'}]}
          // ]
      };
      const map = new google.maps.Map(document.getElementById('map'), mapOptions);
      var marker = new google.maps.Marker({
          //position: myLatlng,
          title: 'Hello World!'
      });

        

        var infowindow = new google.maps.InfoWindow();
  // To add the marker to the map, call setMap();
  marker.setMap(map);
  this.userService.getUser(undefined,data,'All').subscribe(heroes => {
    for (var i = 0;i < heroes.length; i++) {

      var name = heroes[i].user_name;
      var image = heroes[i].user_image;
      var status = heroes[i].user_status;
      var username = heroes[i].user_username;
      var head = heroes[i].user_head;
      var tel = heroes[i].user_tel;
      var address = heroes[i].user_address;
      var province = heroes[i].user_province;
      var amphur = heroes[i].user_amphur;
      var facebook = heroes[i].user_facebook;
      var email = heroes[i].user_email;
      // var content = '<div id="content">'+
      //       '<div id="siteNotice">'+
      //       '</div>'+
      //       '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      //       '<div id="bodyContent">'+
      //       '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      //       'sandstone rock formation in the southern part of the '+
      //       'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      //       'south west of the nearest large town, Alice Springs; 450&#160;km '+
      //       '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      //       'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      //       'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      //       'Aboriginal people of the area. It has many springs, waterholes, '+
      //       'rock caves and ancient paintings. Uluru is listed as a World '+
      //       'Heritage Site.</p>'+
      //       '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      //       'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      //       '(last visited June 22, 2009).</p>'+
      //       '</div>'+
      //       '</div>';
      var content = '<style>\
              .div-pic{\
                margin: auto;\
                width: 30.5%;\
              }\
              .pic{\
                border-radius:30em;\
                border:1px solid #FFF;\
                box-shadow: 4px 4px 5px 0px rgba(0,0,0,0.75);\
              }\
              .well{\
                background-color:#99e6d86b;\
              }\
            </style>'+
            '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<div id="bodyContent" style="width: 420px;">'+
            '<div class="row"> <div class="col-sm-4">\
            <img src="'+image+'" width="120" height="120"><br>\
            </div><div class="col-sm-8">\
            <div class="row">\
              <div class="col-sm-8">\
                <h4>'+name+'</h4>\
              </div>\
              <div class="col-sm-4">\
                <p style="margin-bottom: 5px;margin-top: 5px;">('+status+')</p>\
              </div>\
            </div>\
            <div class="row">\
            <div class="col-sm-5">\
            <p><i class="fa fa-user-circle-o" aria-hidden="true"></i>'+username+'</p>\
            </div>\
            <div class="col-sm-7">\
            <p><i class="fa fa-mobile" aria-hidden="true"></i>'+tel+'</p>\
            </div>\
            <div class="col-sm-12">\
            <p><i class="fa fa-envelope-o" aria-hidden="true"></i> '+email+'</p>\
            </div>\
            </div>\
            <a href="../profile/'+username+'"><p>ดูข้อมูลส่วนตัว</p></a>\
            </div><br>'+
            '</div>\
            </div>'+
            '</div>';
            // <hr width="120">
      var bounds = new google.maps.LatLngBounds();
      var position = new google.maps.LatLng(heroes[i].user_lat, heroes[i].user_lng);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: ((heroes[i].user_status=='dealer')?'assets/dealer.png':((heroes[i].user_status=='vip')?'assets/vip.png':((heroes[i].user_status=='gold')?'assets/gold.png':'assets/admin.png'))),
            // shape: shape,
            title: heroes[i].user_name
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
        google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
          return function() {
             infowindow.setContent(content);
             infowindow.open(map,marker);
          };
        })(marker,content,infowindow)); 
    }

  });
  }

}
