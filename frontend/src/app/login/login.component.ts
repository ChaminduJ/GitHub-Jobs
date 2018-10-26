import { Component, TemplateRef, OnInit} from '@angular/core';
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from 'rxjs/operators';

import { AdminService } from "../admin.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit{
  modalRef: BsModalRef;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(private modalService: BsModalService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService) {

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  login() {
    this.adminService.login(this.loginForm.value).subscribe(response => {
      console.log(response);
      this.router.navigate(['/login']);
    });
  }
  ngOnInit(){

  }
}
