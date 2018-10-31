import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { Observable, of, throwError } from "rxjs";

import { AuthGuard } from "./auth.guard";
@Injectable({
  providedIn: "root"
})
export class JobService {
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


  getJobs() {
    return this.http.get(`${this.uri}/users`).pipe(
      catchError(this.handleError));
  }
  getJobById(id) {
    return this.http.get(`${this.uri}/users/${id}`).pipe(
      catchError(this.handleError));
  }
  addJob(formData) {
    const newHeaders = new HttpHeaders().delete('content-type');
    return this.http.post(this.uri + '/users/add', formData, {
      reportProgress: true, observe: 'events', headers: newHeaders
    }).pipe(
      catchError(this.handleError));
  }
 updateJob(formData, id) {
    const newHeaders = new HttpHeaders().delete('content-type');
   return this.http.put(`${this.uri}/users/${id}`, formData, {
     reportProgress: true,
     observe: "events",
     headers: newHeaders
   }).pipe(
     catchError(this.handleError));
  }

  deleteJob(id) {
    return this.http.delete(`${this.uri}/users/${id}`).pipe(
      catchError(this.handleError));
  }

}
