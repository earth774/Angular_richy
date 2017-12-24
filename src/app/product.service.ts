import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Prduct } from './data-model';
declare var $:any;
let httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }
  getHeroes (): Observable<Prduct[]> {
  	return this.http.get<Prduct[]>('http://localhost:3000/list')
  }
  public addProduct (hero: any,image:string){
  	let data ={
          'var_name':hero.name,
          'var_price':hero.price,
          'var_des':hero.description,
          'image':image
      }
	  return this.http.post('http://localhost:3000/add_order',data,httpOptions)
  	}
  	public deleteProduct(id:number,image:string){
  		let data ={
          'var_id':id,
          'image':image
      	}
	  return this.http.post('http://localhost:3000/delete_order',data,httpOptions)
  	}
  	public updateProduct(hero: any,image:string){
  		let data ={
          'id':hero.id,
          'var_name':hero.name,
          'var_price':hero.price,
          'var_des':hero.description,
          'line_image':hero.image,
          'image':image
      	}
      	console.log(data);
	  return this.http.post('http://localhost:3000/update_order',data,httpOptions)
  	}
}
