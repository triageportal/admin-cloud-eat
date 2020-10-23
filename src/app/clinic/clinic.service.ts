import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { domain } from '../data/domain';
import { Clinic } from '../interface/clinic.interface';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  domain = domain;
  clinicToEdit: Clinic;
  foundClinics: Clinic[];
  clinic: Clinic;

constructor(private authService: AuthService, private http: HttpClient) { }

  get(searchQuery) {
    const token = this.authService.getToken();
    return this.http.get<any>(this.domain + 'clinic/search/' + searchQuery + '?token=' + token)
  }

  assign(id) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.patch<any>(this.domain + 'assign-clinic?token=' + token, {id: id}, {headers: headers})
  }



  update(clinic) {
    const token = this.authService.getToken();
    clinic['contactName'] = this.clinicToEdit.contactName;
    clinic['contactEmail'] = this.clinicToEdit.contactEmail;
    console.log(clinic);
    console.log(this.clinicToEdit);
    
    const body = {clinic: clinic};
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.patch<any>(this.domain + 'update-clinic?token=' + token, body, {headers: headers})
  }

  suspend (clinic) {
    const token = this.authService.getToken();
    const body = {id: clinic.id, action: 'suspend'};
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.put<any>(this.domain + 'clinic?token=' + token, body, {headers: headers})
  }

  delete(clinic) {
    const token = this.authService.getToken();
    return this.http.delete<any>(this.domain + 'clinic?id=' + clinic.id + '&token=' + token);
  }

  create(clinic, clinicId) {
    console.log(clinic);
    
    const token = this.authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    if (clinicId) {
      clinic['id'] = clinicId;
      clinic['contactName'] = this.clinicToEdit.contactName;
      clinic['contactEmail'] = this.clinicToEdit.contactEmail;
      return this.http.patch<any>(this.domain + 'clinic?token=' + token, clinic);
    } else {
      return this.http.post<any>(this.domain + 'clinic?token=' + token, clinic);
    }  
  }

  search(keyword) {
    const token = this.authService.getToken();
    console.log(keyword);
    
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    let params = new HttpParams()
        .set('keyword', keyword)
        .set('token', token);
    return this.http.get<any[]>(this.domain + 'clinic', {params: params})
  }


}