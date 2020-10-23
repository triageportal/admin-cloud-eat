import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

constructor() { }

  show(){
    this.loaderStateSource.next('flex');
  }

  hide (){
    this.loaderStateSource.next('none');
  }

  loaderStateSource = new Subject<any>();
  loaderStateObservable = this.loaderStateSource.asObservable();

}
