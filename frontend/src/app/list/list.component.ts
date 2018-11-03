import { Component, OnInit, TemplateRef } from "@angular/core";
import { Router, ActivatedRoute} from '@angular/router';

import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";

import { Job } from '../job.model';
import { JobService } from '../job.service';
import { AdminService } from '../admin.service';

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  jobs: Job[];
  modalRef: BsModalRef;
  url = "http://localhost:3000/public/img/";
  errorMsg: string;
  //initializing p to one
  p: number = 1;
  constructor(
    private jobService: JobService,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    this.fetchJobs();
  }
  fetchJobs() {
    this.jobService.getJobs().subscribe(
      (data: Job[]) => {
        this.jobs = data;
      },
      err => {
        this.errorMsg = err;
      }
    );
  }
  editJob(id) {
    this.router.navigate([`/edit/${id}`]);
  }
  deleteJob(id) {
    this.jobService.deleteJob(id).subscribe(
      () => {
        this.fetchJobs();
      },
      err => {
        this.errorMsg = err;
      }
    );
  }
}