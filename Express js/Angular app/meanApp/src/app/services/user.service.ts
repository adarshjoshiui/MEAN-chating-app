import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({ providedIn: 'root',})
export class UserService implements OnInit {

  constructor(public http: HttpClient) { }

  ngOnInit() {}

  
  login(user: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/users/login', user, httpOptions);
  }
  
  getOnlineUsers(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/users/getOnlineUsers');
  }
}
