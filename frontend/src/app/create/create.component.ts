import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from "../job.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;

  constructor(private jobService: JobService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      how_to_apply: ['', Validators.required],
      company: ['', Validators.required],
      company_url: ['', Validators.required],
      company_logo: ['', Validators.required],
      url: ['', Validators.required]
    });
  }

  addJob(title, type, description, location, how_to_apply, company, company_url, company_logo, url){
    this.jobService.addJob(title, type, description, location, how_to_apply, company, company_url, company_logo, url).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }

  ngOnInit() {
  }

}
