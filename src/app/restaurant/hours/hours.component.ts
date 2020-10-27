import { Component, OnInit, ViewChild, ElementRef, Output, Input, EventEmitter } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss']
})
export class HoursComponent implements OnInit {

  from = {hour: '00', ap: 'am'};
  to = {hour: '00', ap: 'am'};

  @ViewChild("form") form: ElementRef;
  @Output() hoursEmit = new EventEmitter<any>();
  @Input() week: any;
  

  @ViewChild("hoursModal") hoursElement: ElementRef;
  @ViewChild("fromOption") fromOption: ElementRef;
  @ViewChild("fromLabel") fromLabel: ElementRef;
  @ViewChild("toOption") toOption: ElementRef;
  @ViewChild("toLabel") toLabel: ElementRef;
  hoursModalInstance: any;
  day: any;
  hoursList = ['00', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  dayIndex: any;


  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit(): void { 
    M.Modal.init(this.hoursElement.nativeElement, {dismissible: false});
    this.hoursModalInstance = M.Modal.getInstance(this.hoursElement.nativeElement);
  }

  setOptions(): void {
    M.FormSelect.init(this.toOption.nativeElement);
    M.FormSelect.init(this.fromOption.nativeElement);
}



  onSave() {
    this.hoursModalInstance.close()
    this.day.from.hour = this.from.hour
    this.day.to.hour = this.to.hour
    this.day.from.ap = this.from.ap
    this.day.to.ap = this.to.ap
    this.from.hour = '00';
    this.to.hour = '00';
    this.from.ap = 'am';
    this.to.ap = 'am';
  }

  onCancel() {
    this.hoursModalInstance.close()
    this.from.hour = '00';
    this.to.hour = '00';
    this.from.ap = 'am';
    this.to.ap = 'am';
  }

  editHours(day, index) {
    this.from.hour = day.from.hour;
    this.to.hour = day.to.hour;
    this.from.ap = day.from.ap;
    this.to.ap = day.to.ap;
    this.dayIndex = index;
    this.day = day;
    setTimeout(() => {
      this.hoursModalInstance.open();
      this.setOptions()
    })
    
  }


}
