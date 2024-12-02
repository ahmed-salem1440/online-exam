import { LoginAdapter } from './adapters/login-adapter.adapter';
import { Injectable } from '@angular/core';
import { AuthAPI } from './base/AuthAPI';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthEndpoint } from './enums/AuthEndpoint';
import { RegisterAdapter } from './adapters/register-adapter.adapter';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements AuthAPI {

  constructor( private _HttpClient:HttpClient, private _LoginAdapter:LoginAdapter, private _RegisterAdapter:RegisterAdapter) { }
  
  signup(data: any): Observable<any> {
    return this._HttpClient.post(AuthEndpoint.SIGNUP,data).pipe(
      map(res => this._RegisterAdapter.adapt(res)))
  }
  signin(data: any): Observable<any> {
    return this._HttpClient.post(AuthEndpoint.SIGNIN,data).pipe(
      map(res=> this._LoginAdapter.adapt(res)))
  }
  changePassword(data: any): Observable<any> {
    return this._HttpClient.patch(AuthEndpoint.CHANGE_PASSWORD,data)
  }
  deleteAccount(data: any): Observable<any> {
    return this._HttpClient.delete(AuthEndpoint.DELETE_ACCOUNT,data)
  }
  editProfile(data: any): Observable<any> {
    return this._HttpClient.put(AuthEndpoint.EDIT_PROFILE,data)
  }
  logout(data: any): Observable<any> {
    return this._HttpClient.get(AuthEndpoint.LOGOUT,data)
  }
  userInfo(data: any): Observable<any> {
    return this._HttpClient.get(AuthEndpoint.USER_INFO,data)
  }
  forgetPassword(data: any): Observable<any> {
    return this._HttpClient.post(AuthEndpoint.FORGET_PASSWORD,data)
  }
  verifyCode(data: any): Observable<any> {
    return this._HttpClient.post(AuthEndpoint.VERIFY_CODE,data)
  }
  resetPassword(data: any): Observable<any> {
    return this._HttpClient.put(AuthEndpoint.RESET_PASSWORD,data)
  }
}
