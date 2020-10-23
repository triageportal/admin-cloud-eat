import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { first } from 'rxjs/operators';
import * as M from 'materialize-css';
import { TriModalService } from './tri-modal.service';
import { TriModalInterface } from './tri-modal.interface';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-tri-modal',
  templateUrl: './tri-modal.component.html',
  styleUrls: ['./tri-modal.component.css']
})
export class TriModalComponent implements OnInit {

  @ViewChild("triModal") triElement: ElementRef;
  triModalInstance: any;

  modal: TriModalInterface;
  
  constructor(private triModalService: TriModalService, private loader: LoaderService) { }

  ngOnInit() {
    
    this.triModalService.triModalStateObservable.subscribe (
      result => {
        this.loader.hide();
        this.modal = result;
        if (result.state == 'open') {
          this.triModalInstance.open();
        }
      }
    )
  }

  ngAfterViewInit(): void { 
    M.Modal.init(this.triElement.nativeElement, {dismissible: false});
    this.triModalInstance = M.Modal.getInstance(this.triElement.nativeElement);
  }

  onRespond(respond){
    this.triModalService.triModalRespondSource.next(respond);
    this.triModalInstance.close();
  }


}
