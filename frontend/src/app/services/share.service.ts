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
}
