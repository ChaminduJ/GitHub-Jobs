import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { Job } from '../job.model';
import { JobService } from '../job.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  jobs: Job[];
  displayedColumns = ['created_at', 'title', 'type', 'actions'];

  constructor(private jobService: JobService, private router: Router) { }

  ngOnInit() {
    this.fetchJobs();
  }

  fetchJobs(){
    this.jobService.getJobs().subscribe((data: Job[])=>{
      this.jobs = data;
      console.log('Data requested ...');
      console.log(this.jobs);
    });
  }
  editJob(id){
    this.router.navigate([`/edit/${id}`]);
  }

  deleteJob(id){
    this.jobService.deleteJob(id).subscribe(()=>{
      this.fetchJobs();
    });
  }
}
