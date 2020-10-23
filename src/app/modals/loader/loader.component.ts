import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  loader = 'none';

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.loaderStateObservable.subscribe(
      result => {
        this.loader = result;
      },
      error => {
        this.loader = 'none'
      }
    )
  }



}
