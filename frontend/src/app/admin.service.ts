import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  uri = "http://localhost:3000";
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // return throwError(`Returned code ${error.status}, ` + `body was: ${error.error}`);
      return throwError(`${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };
  
  login(email, password) {
    const admin = {
      email: email,
      password: password
    };
    return this.http.post(`${this.uri}/users/login`, admin).pipe(
      catchError(this.handleError)
    );
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  deleteToken(){
    localStorage.removeItem('token');
  }
  getAdminPayload(){
    var token = localStorage.getItem('token');
    if(token){
      var adminPayload =atob(token.split('.')[1]);
      return JSON.parse(adminPayload);
    }
    else{
      return null;
    }
  }
  isLoggedIn(){
    var adminPayload = this.getAdminPayload();
    if(adminPayload){
      return adminPayload.exp > Date.now() / 1000;
    }
    else
      return false;
  }
}
