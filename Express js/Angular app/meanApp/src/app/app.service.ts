import { UserService } from './services/user.service';
// import { ContentfulService } from './../contentful/services/contentful.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// import { SessionService } from './session/';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public loggedIn = new BehaviorSubject<boolean>(false);
  public triggered = new BehaviorSubject<boolean>(true);
  public homeRef = new BehaviorSubject<String>('');
  _userActionOccured: Subject<void> = new Subject();

  constructor(private http: HttpClient, private router: Router,public userService:UserService ) { }

  login(username: string, password: string) {
    this.userService.login({ 'email' : username, 'pwd' : password }).subscribe( res =>{
    if(res[0].massage==='Ok') {
      this.setProperties(); //sets 'loggedIn' as 'true';
      this.router.navigate(['/dashboard']);
    } else {
      alert('invalid user name or password')
    }
    })
  }

  logout() {
    this.loggedIn.next(false);
    this.triggered.next(true);
    this.homeRef.next('');
    localStorage.clear();
  }

  // loadUserSharedData(): Observable<any> {
  //   return this.content.getUserSharedData();
  // }

  get isLoggedIn(): Observable<Boolean> {
    return this.loggedIn.asObservable();
  }

  get isTriggered(): Observable<Boolean> {
    return this.triggered.asObservable();
  }

  get getHomeRef(): Observable<String> {
    return this.homeRef.asObservable();
  }

  get userActionOccured(): Observable<void> {
    return this._userActionOccured.asObservable();
  }

  setProperties() {
    this.loggedIn.next(true);
    this.triggered.next(false);
    this.homeRef.next('/pages');
  }

  notifyUserAction() {
    this._userActionOccured.next();
  }

  loginRoute() {
    this.router.navigate(['/login']);
  }

  clearToken(): Observable<any> {
    return this.http.get<any>(`/rest/api/logout`);
  }
}
