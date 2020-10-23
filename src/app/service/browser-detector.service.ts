import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserDetectorService {

constructor() { }

  printSupport() {
    const agent = window.navigator.userAgent.toLowerCase();
    if (agent.indexOf('chrome') != -1 || agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1) {
      return true
    } else {
      return false
    }
  }

}
