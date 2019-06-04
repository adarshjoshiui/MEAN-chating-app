import { AuthenticationService } from './../guards/auth-guard.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { Router } from '@angular/router';
import { AppService } from '../app.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  
})
export class LogInComponent implements OnInit {
  model ={}
  constructor( public userService: UserService,public router:Router,public appService:AppService,private authenticationService: AuthenticationService,) { }

  ngOnInit() {
  }
  onSubmit(data) {
    this.authenticationService.login(data.email,data.pwd);
    
  }
  succesCallback(res: any): void {
    //
    if(res.massage==='Ok') {
     
      this.router.navigate(['/dashboard']);
    }else {
      alert('Invalid username or password');
    }
  }
//   onLogout() {
//     this.appService.logout();
//     this.appService.loginRoute();
//  }
}
