import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {
  json=[];
  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    for(let i in json){
      this.json.push({'รหัสสินค้า':json[i].order_id,
                      'รหัสสมาชิก':json[i].user_id,
                      'ชื่อ-สกล':json[i].user_name,
                      'วัน-เวลา':json[i].order_date,
                      'ราคา':json[i].order_total,
                      'จำนวน':json[i].order_num,
                      'Username':json[i].user_username,
                      'สถานะ':json[i].user_status,
                      'สถานนะการจัดส่ง':((json[i].order_status==1)?'สถานนะจัดส่งเรียบร้อย':'สถานนะยังไม่ได้จัดส่ง'),
                      'หัวข่าย':json[i].user_head,
                      'อำเภอ':json[i].user_amphur,
                      'จังหวัด':json[i].user_province,
                      'lat':json[i].user_lat,
                      'lng':json[i].user_lng});
    }
    // console.log(this.json);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}