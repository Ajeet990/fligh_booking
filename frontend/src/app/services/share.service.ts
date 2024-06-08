import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }

  userDetails = new BehaviorSubject<{
    name:string,
    email:string,
    token:string,
    role:any
  }>({
    name:'',
    email:'',
    token:'',
    role:''
  })

  headerDetail = new BehaviorSubject<{
    normalUser : boolean,
    vendorUser : boolean,
    superUser : boolean
  }>({
    normalUser : false,
    vendorUser : false,
    superUser : false
  })
}
