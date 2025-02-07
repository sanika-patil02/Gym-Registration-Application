import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
//observable is used to handle asynchronous request and responses
@Injectable({
  providedIn: 'root'
})
export class SharedsericeService {
  posttRegistration(value: any) {
    throw new Error('Method not implemented.');
  }
  readonly baseUrl = "https://localhost:44391/api/Registration/";
  url!: string;
  constructor(private http: HttpClient) { }

  getRegisteredUserList(): Observable<any[]> {

    return this.http.get<User[]>(this.baseUrl);
  }
  getbyId(id: number) {
    debugger
    this.url = `UserDetails/${id}`;
    return this.http.get<User>(this.baseUrl + this.url);
  }

  posttRegisteredUser(registerObj: User, url: string) {
    this.url = "PostGym";
    return this.http.post<User>(this.baseUrl + this.url, registerObj);
  }


  // posttRegisteredUser(data: any, url: any) {
  //   url = this.baseUrl + url;
  //   return this.http.post(url, data);
  // }


  updateRegisteredUser(id:number,val: any) {
    this.url = "Updatedetails";
    return this.http.put<User>(this.baseUrl + this.url+`/${id}`, val);
  }


  deleteRegistereduser(val: any) {
    this.url = val;
    return this.http.delete<User>(this.baseUrl + val);
  }

}
