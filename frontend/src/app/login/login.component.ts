import { Component, TemplateRef, OnInit} from '@angular/core';
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from 'rxjs/operators';

import { AdminService } from "../admin.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  modalRef: BsModalRef;
  loginForm: FormGroup;
  authenticated: boolean;
  returnUrl: string;
  errorMsg: string;
  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService
  ) {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  login(email, password) {
    this.adminService.login(email, password).subscribe(res => {
      this.router.navigate(["/list"]);
      this.adminService.setToken(res["token"]);
      this.modalRef.hide();
    },
    err => {
      console.log(err);
      this.errorMsg = err;
    });  
  }
  ngOnInit() {
  }
  logout() {
    this.adminService.deleteToken();
    this.router.navigate(["/list"]);
  }


}
