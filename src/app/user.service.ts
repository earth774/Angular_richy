import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User,Province } from './data-model';
import {Md5} from 'ts-md5/dist/md5';

let httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class UserService {
	user:any;
  constructor(private http: HttpClient) { }

  getUser (name,status,location): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/user/'+name+'/'+status+'/'+location)
  }

  getProvince (): Observable<Province[]> {
    return this.http.get<Province[]>('http://localhost:3000/province')
  }
  getAmphur (name): Observable<Province[]> {
    return this.http.get<Province[]>('http://localhost:3000/amphur/'+name)
  }

  public login (hero:any){
    let data ={
          'var_user':hero.username,
          'var_pass':Md5.hashStr(hero.password) ,
      }
      console.log(data);
    return this.http.post('http://localhost:3000/token',data,httpOptions).subscribe(heroes => {
        this.user = heroes;
        console.log(this.user);
        if(this.user.token!=""){
          localStorage.setItem("user", this.user.token);
          window.location.href='http://localhost:4200/dashboard';
        }else{
          console.log('ข้อมูลไม่ถูกต้อง');
        }
        
    });
  }
  getautoUser (status): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/autocom/'+status)
  }

  
  public addUser (hero: any,image:string,lat:number,lng:number){
    let data ={
          'image':image,
          'var_name': hero.name,
          'var_username':hero.username,
          'var_password':Md5.hashStr(hero.password),
          'var_select':hero.status,
          'var_tel':hero.tel,
          'var_facebook':hero.facebook,
          'var_email':hero.email,
          'address':hero.address,
          'province':hero.province,
          'amphur':hero.amphur,
          'var_head':((hero.continent.name)?hero.continent.name.substring(hero.continent.name.indexOf("/")+2):hero.continent.substring(hero.continent.indexOf("/")+2)),
          'lat':lat,
          'lng':lng

      }
      console.log(data);
    return this.http.post('http://localhost:3000/add_member',data,httpOptions)
    }
    public deleteUser (id:number,image:string){
    let data ={
          'var_id':id,
          'var_image': image,
      }
      console.log(data);
    return this.http.post('http://localhost:3000/delete_user',data,httpOptions)
    }
    public editUser (hero: any,image:string,line_image:string,lat:number,lng:number){
    let data ={
          'var_image':(image)?image:line_image,
          'var_name': hero.name1,
          'var_user':hero.username1,
          'var_password':hero.password1,
          'var_select':hero.status1,
          'var_tel':hero.tel1,
          'var_facebook':hero.facebook1,
          'var_email':hero.email1,
          'var_head':((hero.continent1.length<=9)?hero.continent1:hero.continent1.name.substring(hero.continent1.name.indexOf("/")+2)),
          'lat':lat,
          'lng':lng,
          'line_image':line_image,
          'id':hero.id,
          'address':hero.address1,
          'province':hero.province1,
          'amphur':hero.amphur1,

      }
      console.log(data);
    return this.http.post('http://localhost:3000/update_profind',data,httpOptions)
    }
  public listprofile (username:string){
    let data ={
          'var_user':username,
      }
      console.log(data);
    return this.http.post('http://localhost:3000/show_profind',data,httpOptions);
    }
    public lamdap(status){
      let data ={
        'var_status':status
      }
      console.log(data);
    return this.http.post('http://localhost:3000/lamdap',data,httpOptions)
    }
    public profile (hero: any,image:string,line_image:string,lat:number,lng:number){
    let data ={
          'image':image,
          'var_name': hero.name1,
          'var_user':hero.username1,
          'var_tel':hero.tel1,
          'var_facebook':hero.facebook1,
          'var_email':hero.email1,
          'address':hero.address1,
          'province':hero.province1,
          'amphur':hero.amphur1,
          'lat':lat,
          'lng':lng,
          'line_image':line_image

      }
      console.log(data);
    return this.http.post('http://localhost:3000/profind',data,httpOptions)
    }
}
