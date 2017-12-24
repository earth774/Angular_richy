export class Prduct{
  og_id:number;
  og_name:string;
  og_pic:string;
  og_price:number;
  og_des:string;
}

export class User{
  user_id:number;
  user_image:string;
  user_username:string;
  user_password:number;
  user_status:string;
  user_head:string;
  user_name:string;
  user_tel:string;
  user_facebook:string;
  user_email:string;
  user_address:string;
  user_province:string;
  user_amphur:string;
  user_lat:string;
  user_lng:string;
  token:string;
  num:number;
  results:string
}

export class Profile{
  email:string;
  facebook:string;
  image:string;
  names:string;
  tel:string;
  user:string;
  user_lat:number;
  user_lng:number;
}

export class Num_person{
  num_user:number;
}

export class Report{
  order_id: number;
  user_id: number;
  order_date: string;
  order_total: number;
  order_status: number;
  user_image: string;
  user_username: string;
  user_password: string;
  user_status: string;
  user_head: string;
  user_name: string;
  user_tel: string;
  user_facebook: string;
  user_email: string;
  user_lat: string;
  user_lng: string;
}

export class Report_detail{
  order_d_id: number;
  order_d_name: number;
  order_d_img: string;
  order_d_title: string;
  order_d_qty: number;
  order_d_price: number;
  order_id: number;
  order_d_date: string;
}

export class Province{
  PROVINCE_ID: number;
  PROVINCE_CODE: string;
  PROVINCE_NAME: string;
  PROVINCE_NAME_ENG: string;
  AMPHUR_ID: number;
  AMPHUR_CODE: string;
  AMPHUR_NAME: string;
  AMPHUR_NAME_ENG: string;
  GEO_ID: number;
}

export class Chart{
  status:string;
  data_num:any;
  dateinMonth:number
}


export const states = ['admin', 'dealer', 'vip', 'gold'];