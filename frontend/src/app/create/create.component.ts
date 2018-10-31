import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from "../job.service";
import { HttpClient } from 'selenium-webdriver/http';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { HttpEventType } from '@angular/common/http';
@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"]
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;
  companyLogoUrl: String;
  imageUrl: String = "../assets/img/upload.png";
  fileToUpload: File = null;
  progress;
  errorMsg;
  constructor(
    private jobService: JobService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm = this.fb.group({
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

  addJob() {
    if (this.fileToUpload != null) {
      const formData = new FormData();
      formData.append("title", this.createForm.get("title").value);
      formData.append("type", this.createForm.get("type").value);
      formData.append("description", this.createForm.get("description").value);
      formData.append("location", this.createForm.get("location").value);
      formData.append("how_to_apply",this.createForm.get("how_to_apply").value);
      formData.append("company", this.createForm.get("company").value);
      formData.append("company_url", this.createForm.get("company_url").value);
      formData.append("url", this.createForm.get("url").value);
      formData.append("file", this.fileToUpload);
      this.jobService.addJob(formData).subscribe(ev => {
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
  ngOnInit() { }
}
