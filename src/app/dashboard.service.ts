import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Num_person,Chart,Report } from './data-model';
declare var $:any;

let httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) { }

  getNum_User(): Observable<Num_person[]> {
    return this.http.get<Num_person[]>('http://localhost:3000/num_user')
  }

  getchart_day(): Observable<Chart[]> {
    return this.http.get<Chart[]>('http://localhost:3000/chart_today')
  }

  getchart_week(): Observable<Chart[]> {
    return this.http.get<Chart[]>('http://localhost:3000/chart_week')
  }

  getchart_month(): Observable<Chart[]> {
    return this.http.get<Chart[]>('http://localhost:3000/chart_Month')
  }

  getchart_year(user): Observable<Chart[]> {
    return this.http.get<Chart[]>('http://localhost:3000/chart_year/'+user)
  }
  getTop5(status): Observable<Report[]> {
    return this.http.get<Report[]>('http://localhost:3000/top5/'+status)
  }



}
