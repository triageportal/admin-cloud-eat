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
  test = {day: '', startHour: '00', startIndex: 'am', endHour: '00', endIndex: 'am'}

  startHour = '00';
  startIndex = 'am';
  endHour = '00';
  endIndex = 'am';

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
    this.day.startHour = this.startHour
    this.day.endHour = this.endHour
    this.day.startIndex = this.startIndex
    this.day.endIndex = this.endIndex
    this.startHour = '00';
    this.endHour = '00';
    this.startIndex = 'am';
    this.endIndex = 'am';
    console.log(this.week);
    
  }

  onCancel() {
    this.hoursModalInstance.close()
    this.startHour = '00';
    this.endHour = '00';
    this.startIndex = 'am';
    this.endIndex = 'am';
  }

  editHours(day, index) {
    this.startHour = day.startHour;
    this.endHour = day.endHour;
    this.startIndex = day.startIndex;
    this.endIndex = day.endIndex;
    this.dayIndex = index;
    this.day = day;
    setTimeout(() => {
      this.hoursModalInstance.open();
      this.setOptions()
    })
    
  }


}
