import { Injectable, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutModalService {
  idleTimer: any;

constructor(private auth: AuthService) { }

  @HostListener('click', ['$event.target'])
  @HostListener('document:keyup', ['$event'])
  @HostListener('document:wheel', ['$event'])
  resetTimer() {
    console.log('button');
    clearTimeout(this.idleTimer)
    this.setLogoutTimer();
  }

  setLogoutTimer () {
    this.idleTimer = setTimeout(()=> {
      console.log('modalService');
      this.modalRespond();
    }, 1000*60*20)
  }

  modalRespond() {
    console.log('modalRespond');
    
    this.logoutModalStateSource.next('open');
    this.logoutModalRespondObservable.pipe(take(1)).subscribe(
      result => {
        console.log(result);
        if (result == 'stay'){
          this.resetTimer();
        } else {
          this.auth.logout();
        }
      }
    )
  }



  logoutModalStateSource = new Subject<any>();
  logoutModalStateObservable = this.logoutModalStateSource.asObservable();


  logoutModalRespondSource = new Subject<string>();
  logoutModalRespondObservable = this.logoutModalRespondSource.asObservable();
}
