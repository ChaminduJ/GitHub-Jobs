import { Component, OnInit, TemplateRef } from "@angular/core";
import { Router, ActivatedRoute} from '@angular/router';

import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";

import { Job } from '../job.model';
import { JobService } from '../job.service';

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  jobs: Job[];
  jobFilter: any = { title: "" };
  modalRef: BsModalRef;
  job$: Object;

  constructor(
    private jobService: JobService,
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
    this.jobService.getJobs().subscribe((data: Job[]) => {
      this.jobs = data;
      console.log("Data requested ...");
      console.log(this.jobs);
    });
  }
  editJob(id) {
    this.router.navigate([`/edit/${id}`]);
  }
  deleteJob(id) {
    this.jobService.deleteJob(id).subscribe(() => {
      this.fetchJobs();
    });
  }
  getJobById(id) {
    this.jobService.getJobById(id).subscribe(() => {
      this.fetchJobs();
    });
  }
}