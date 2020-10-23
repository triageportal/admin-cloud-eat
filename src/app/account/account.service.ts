import { Injectable } from '@angular/core';
import { domain } from '../data/domain';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  domain = domain;
  accountToEdit: any;
  foundaccounts: any[];
  account: any;

constructor(private authService: AuthService, private http: HttpClient) { }

  get(searchQuery) {
    const token = this.authService.getToken();
    return this.http.get<any>(this.domain + 'account/search/' + searchQuery + '?token=' + token)
  }

  assign(id) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.patch<any>(this.domain + 'assign-account?token=' + token, {id: id}, {headers: headers})
  }



  update(account) {
    const token = this.authService.getToken();
    account['contactName'] = this.accountToEdit.contactName;
    account['contactEmail'] = this.accountToEdit.contactEmail;
    console.log(account);
    console.log(this.accountToEdit);
    
    const body = {account: account};
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.patch<any>(this.domain + 'update-account?token=' + token, body, {headers: headers})
  }

  suspend (account) {
    const token = this.authService.getToken();
    const body = {id: account.id, action: 'suspend'};
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.put<any>(this.domain + 'account?token=' + token, body, {headers: headers})
  }

  delete(account) {
    const token = this.authService.getToken();
    return this.http.delete<any>(this.domain + 'account?id=' + account.id + '&token=' + token);
  }

  create(account, accountId) {
    console.log(account);
    
    const token = this.authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    if (accountId) {
      account['id'] = accountId;
      account['contactName'] = this.accountToEdit.contactName;
      account['contactEmail'] = this.accountToEdit.contactEmail;
      return this.http.patch<any>(this.domain + 'account?token=' + token, account);
    } else {
      return this.http.post<any>(this.domain + 'account?token=' + token, account);
    }  
  }

  search(keyword) {
    const token = this.authService.getToken();
    console.log(keyword);
    
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    let params = new HttpParams()
        .set('keyword', keyword)
        .set('token', token);
    return this.http.get<any[]>(this.domain + 'account', {params: params})
  }

}
