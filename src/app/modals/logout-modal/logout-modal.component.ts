import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LogoutModalService } from './logout-modal.service';
import * as M from 'materialize-css';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.css']
})
export class LogoutModalComponent implements OnInit {

  @ViewChild("logoutModal") modalElement: ElementRef;
  logoutModalInstance: any;
  countDown: any;
  seconds: number = 10;
  
  
  constructor(private logoutModalService: LogoutModalService, ) { }

  ngOnInit() {
    console.log('logoutmodal');
    
    this.logoutModalService.logoutModalStateObservable.subscribe (
      result => {
        console.log(result)
        console.log(this.modalElement.nativeElement);
        
        if (result == 'open') {
          this.logoutModalInstance.open();
          this.startCountDown()
        }
      }
    )
  }

  startCountDown() {
    this.countDown = setInterval(()=>{
      this.seconds--
      if (this.seconds == 0) {
        this.logoutModalService.logoutModalRespondSource.next('logout');
        this.stopCountDown ();
        this.logoutModalInstance.close();
      }
    }, 1000)
  }

  stopCountDown (){
    clearInterval(this.countDown);
    this.seconds = 10;
  }

  ngAfterViewInit(): void { 
    M.Modal.init(this.modalElement.nativeElement, {dismissible: false});
    this.logoutModalInstance = M.Modal.getInstance(this.modalElement.nativeElement);
  }

  onRespond(respond){
    this.stopCountDown ();
    this.logoutModalService.logoutModalRespondSource.next(respond);
    this.logoutModalInstance.close();
  }


}
