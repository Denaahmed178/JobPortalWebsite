import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { JobServiceService } from '../../services/service-job/job-service.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent {
  jobId:any
  job:any

  constructor(private route:ActivatedRoute, private jobService:JobServiceService , private router:Router , private title:Title) {
    this.title.setTitle("Details About Job")
  }

  ngOnInit():void {
    this.jobId = this.route.snapshot.paramMap.get("id")
    this.job = this.jobService.jobs[this.jobId]
  }
}
