import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Report,Report_detail } from './data-model';
declare var $:any;

let httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }

  getReport(name:string,status:string,location:string,order_status:string): Observable<Report[]> {
    return this.http.get<Report[]>('http://localhost:3000/report/'+name+'/'+status+'/'+location+'/'+order_status)
  }
  getReport_con(): Observable<Report[]> {
    return this.http.get<Report[]>('http://localhost:3000/report_con')
  }
  getReport_con_detail(id:number): Observable<Report_detail[]> {
  	console.log(id);
    return this.http.get<Report_detail[]>('http://localhost:3000/report_con_detail/'+id)
  }
  public addUser (id:number){ 
    let data ={
          'var_status':1,
          'var_id': id,

      }
      console.log(data);
    return this.http.post('http://localhost:3000/cnf_status',data,httpOptions)
    }
}
