import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class JobService {
  uri = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  getJobs() {
    return this.http.get(`${this.uri}/users`);
  }
  getJobById(id) {
    return this.http.get(`${this.uri}/users/${id}`);
  }
  addJob(
    title,
    type,
    description,
    location,
    how_to_apply,
    company,
    company_url,
    company_logo,
    url
  ) {
    const job = {
      title: title,
      type: type,
      description: description,
      location: location,
      how_to_apply: how_to_apply,
      company: company,
      company_url: company_url,
      company_logo: company_logo,
      url: url
    };
    return this.http.post(`${this.uri}/users/add`, job);
  }
  updateJob(
    id,
    title,
    type,
    description,
    location,
    how_to_apply,
    company,
    company_url,
    company_logo,
    url
  ) {
    const job = {
      title: title,
      type: type,
      description: description,
      location: location,
      how_to_apply: how_to_apply,
      company: company,
      company_url: company_url,
      company_logo: company_logo,
      url: url
    };
    return this.http.put(`${this.uri}/users/${id}`, job);
  }

  deleteJob(id) {
    return this.http.delete(`${this.uri}/users/${id}`);
  }
}
