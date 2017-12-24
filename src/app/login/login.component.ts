import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	heroForm :FormGroup ;
  constructor(private fb:FormBuilder,private userService:UserService) { }

  ngOnInit() {
  	this.heroForm = this.fb.group({
      username:['', Validators.required ],
      password:['', Validators.required ],
    });
    }
    onSubmit(){
    this.userService.login(this.heroForm.value)
    // console.log(this.heroForm.value);
  }
  }







