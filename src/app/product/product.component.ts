import { Component, OnInit,ElementRef,ViewChild   } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductService } from '../product.service';
import { Prduct } from '../data-model';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('img') img;
  @ViewChild('filess') filess;
  myImg:any;
  selectedFileName: string = null;
  basefile: any;
  imgdata:string;
	heroForm :FormGroup ;

  s:number;
	payLoad = '';
  heroes :Prduct[];
	@ViewChild('myModal') myModal:ElementRef;


  delete_image:string;
  delete_id:number;
  constructor(private fb:FormBuilder,private productService:ProductService) { 
  	this.createForm();	
  	this.list();
  }

  list(){
    this.productService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  createForm() {
    this.heroForm = this.fb.group({
      name: ['', Validators.required ],
      price: ['', Validators.required ],
      description: ['', Validators.required ]
    });
    this.s=0;
    this.imgdata='';
  }

  ngOnInit() {
  	console.log(this.heroForm.value);
  }
  edit(name,price,des,image,id){
     this.heroForm = this.fb.group({
      name: [name, Validators.required ],
      price: [price, Validators.required ],
      description: [des, Validators.required ],
      id:[id],
      image:[image]
    });
     this.imgdata = image;
     this.s=1;
  }

  save(value){
  	console.log(this.heroForm.value);

  	
  }
  onUpdate(image){//((this.imgdata==undefined)?image:this.imgdata),image
    console.log(this.heroForm.value,image);
    // this.payLoad = JSON.stringify(this.heroForm.value);
    this.productService.updateProduct(this.heroForm.value,image).subscribe(heroes => {console.log(heroes);
    this.list();
    this.notifi("ti-pencil","ท่านได้ทำการแก้ไขข้อมูลสินค้าเรียบร้อยแล้ว - <b>Richlybrownie</b>",'warning');
  });
  }
  delete_modal(id,image){
    this.delete_image=image;
    this.delete_id=id;
  }
  onDelete(){
    this.productService.deleteProduct(this.delete_id,this.delete_image).subscribe(heroes => {console.log(heroes);
      this.notifi("ti-trash","ท่านได้ทำการลบข้อมูลสินค้าเรียบร้อยแล้ว - <b>Richlybrownie</b>",'danger');
      this.list();
    
  });
    
  }
  // take a picture
  onSubmit():void {
  	console.log(this.heroForm.value);
    this.productService.addProduct(this.heroForm.value,this.imgdata).subscribe(heroes => {console.log(heroes);
      this.list();
      this.notifi("ti-check","ท่านได้ทำการเพิ่มข้อมูลสินค้าเรียบร้อยแล้ว - <b>Richlybrownie</b> ",'success');
    });
    this.heroForm.reset();
    this.imgdata='';
  	
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

}
