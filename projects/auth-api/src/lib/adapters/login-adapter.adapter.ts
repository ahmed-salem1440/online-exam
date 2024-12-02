import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';

@Injectable({
  providedIn: 'root'
})
export class LoginAdapter implements Adapter {

  constructor() { }
  adapt(data:any){
    return {
      message:data.message,
      token:data.token,
      userEmail:data.user.email
    }
  }
}
