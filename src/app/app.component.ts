import { Component, Renderer, ElementRef, ViewChild } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
	constructor(private router: Router, public location: Location){
            $(document).ready(function(){
              $('[data-toggle="tooltip"]').tooltip();
            });
    }
	removeFooter() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        titlee = titlee.slice( 1 );
        if(titlee === 'login' || titlee === 'nucleoicons'){
            return false;

        }
        else {
        	if(localStorage.getItem("user")){
            	return true;
        	}else{
        		return false;
        	}
        }
    }
}
