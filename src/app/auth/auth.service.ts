
      import { Injectable} from '@angular/core';

      import { Subject } from 'rxjs';
      import { User } from '../interface/user.interface';
      import { JwtHelperService } from "@auth0/angular-jwt";
      import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
      import { domain } from '../data/domain';
      import { Router } from '@angular/router';

      
      @Injectable({
        providedIn: 'root',
      })
      export class AuthService {
        token: any;
        jwtHelper = new JwtHelperService();
        domain = domain;

      constructor(private router: Router, private http: HttpClient){}

      user: User;

        userObservableSource = new Subject<any>();
        userObservable = this.userObservableSource.asObservable();
      
        // store the URL so we can redirect after logging in
        redirectUrl: string;
      


        login(email, password) {
          const date = new Date();
          const currentTime = date.toLocaleTimeString('en-GB');
          return this.http.post<any>(
            this.domain + 'auth/login', 
            {email: email, password: password, currentTime: currentTime},
            {headers: new HttpHeaders({'X-Requested-With': 'XMLHttpRequest'})})
        }

        setSession(token, user){
          console.log(this.jwtHelper.decodeToken(token))
          localStorage.setItem('triage_admin', JSON.stringify(user));
          localStorage.setItem('triage_admin_token', token);
          this.userObservableSource.next(user);
        }

        

        isLoggedIn(){
          const token = localStorage.getItem('triage_admin_token');
          if (!this.jwtHelper.isTokenExpired(token)) return true;
        }

        getUser() {
          if (this.isLoggedIn()) {
            return JSON.parse(localStorage.getItem('triage_admin'));
          } else {
            this.logout();
          }
        }

        getToken() {
          console.log('gettoken');
          if (this.isLoggedIn()) {
            return localStorage.getItem('triage_admin_token');
          } else {
            this.logout();
          }
        }
      
        logout(): void {
          console.log('logout');
          
          const token = localStorage.getItem('triage_admin_token');
          localStorage.removeItem('triage_admin');
          localStorage.removeItem('triage_admin_token');
          this.userObservableSource.next(false);
          this.http.post(this.domain + 'auth/logout?token=' + token, {}).subscribe(
            result=>{},
            error => {
              console.log(error);             
            } 
          )
          this.router.navigate(['login']);
        }

        assignAccountToUser(id, accountName){
          let user: User = this.getUser()
          /* user.account_id = id;
          user.accountName = accountName; */
          localStorage.setItem('triage_admin', JSON.stringify(user));
          this.userObservableSource.next(user);
        }

      }
  