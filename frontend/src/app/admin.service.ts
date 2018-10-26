import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  uri = "http://localhost:3000";
  constructor(private http: HttpClient) {}
  login(data){
    return this.http.post('http://localhost:3000/users/login', data);
  }
}
