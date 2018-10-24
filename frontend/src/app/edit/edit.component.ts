import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar} from '@angular/material';

import { JobService } from "../job.service";
import { Job } from '../job.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  job: any = {};
  updateForm: FormGroup;

  constructor(private jobService: JobService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  createForm(){
    this.updateForm = this.fb.group({
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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.jobService.getJobById(this.id).subscribe(res => {
        this.job = res;
        this.updateForm.get('title').setValue(this.job.title);
        this.updateForm.get('type').setValue(this.job.type);
        this.updateForm.get('description').setValue(this.job.description);
        this.updateForm.get('location').setValue(this.job.location);
        this.updateForm.get('how_to_apply').setValue(this.job.how_to_apply);
        this.updateForm.get('company').setValue(this.job.company);
        this.updateForm.get('company_url').setValue(this.job.company_url);
        this.updateForm.get('company_logo').setValue(this.job.company_logo);
        this.updateForm.get('url').setValue(this.job.url);
      });
    });
  }

  updateJob(title, type, description, location, how_to_apply, company, company_url, company_logo, url){
    this.jobService.updateJob(this.id, title, type, description, location, how_to_apply, company, company_url, company_logo, url).subscribe(()=>{
      this.snackBar.open('Job updated successfully', 'OK',{
        duration:3000
      });
    });
  }

}
