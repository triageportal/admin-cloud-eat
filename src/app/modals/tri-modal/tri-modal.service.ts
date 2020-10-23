import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TriModalInterface } from './tri-modal.interface';

@Injectable({
  providedIn: 'root'
})
export class TriModalService {

constructor() { console.log('trimodal');
 }

  triModalStateSource = new Subject<TriModalInterface>();
  triModalStateObservable = this.triModalStateSource.asObservable();


  triModalRespondSource = new Subject<string>();
  triModalRespondObservable = this.triModalRespondSource.asObservable();

}
