import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { JobService } from "../job.service";
import { Job } from '../job.model';
import { HttpEventType } from "@angular/common/http";
@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {
  id: String;
  job: any = {};
  updateForm: FormGroup;
  imageUrl: String = "../assets/img/upload.png";
  url = "http://localhost:3000/public/img/";
  fileToUpload: File = null;
  progress;
  errorMsg;

  constructor(
    private jobService: JobService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      title: ["", Validators.required],
      type: ["", Validators.required],
      description: ["", Validators.required],
      location: ["", Validators.required],
      how_to_apply: ["", Validators.required],
      company: ["", Validators.required],
      company_url: ["", Validators.required],
      url: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.jobService.getJobById(this.id).subscribe(res => {
        this.job = res;
        this.updateForm.get("title").setValue(this.job.title);
        this.updateForm.get("type").setValue(this.job.type);
        this.updateForm.get("description").setValue(this.job.description);
        this.updateForm.get("location").setValue(this.job.location);
        this.updateForm.get("how_to_apply").setValue(this.job.how_to_apply);
        this.updateForm.get("company").setValue(this.job.company);
        this.updateForm.get("company_url").setValue(this.job.company_url);
        this.updateForm.get("url").setValue(this.job.url);
      });
    });
  }

  updateJob() {
    if (this.fileToUpload != null) {
      const formData = new FormData();
      formData.append("title", this.updateForm.get("title").value);
      formData.append("type", this.updateForm.get("type").value);
      formData.append("description", this.updateForm.get("description").value);
      formData.append("location", this.updateForm.get("location").value);
      formData.append("how_to_apply", this.updateForm.get("how_to_apply").value);
      formData.append("company", this.updateForm.get("company").value);
      formData.append("company_url", this.updateForm.get("company_url").value);
      formData.append("url", this.updateForm.get("url").value);
      formData.append("file", this.fileToUpload);
      this.jobService.updateJob(formData,this.job._id).subscribe(ev => {
        let event: any = ev;
        if (event.type == HttpEventType.UploadProgress) {
          this.progress = Math.round((event.loaded / event.total) * 100);
        } else if (event.type == HttpEventType.Response) {
          console.log(event.status);
          this.router.navigate(["/list"]);
        }
      },
        err => {
          this.errorMsg = err;
        });
    }
  }
  onFileSelected(event) {
    this.fileToUpload = event.target.files[0];
    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
}
