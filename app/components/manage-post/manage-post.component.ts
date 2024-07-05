import { Component, OnInit } from '@angular/core';
import { PostingService } from '../../services/service-posting/posting.service';
import { Job } from '../../interfaces/job-interface/job';
@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.component.html',
  styleUrl: './manage-post.component.css'
})
export class ManagePostComponent  implements OnInit{
   //jobs2: Job[] = [];
    constructor(public jobserve: PostingService){

    }
    ngOnInit(): void {
      this.jobserve.getJobs().subscribe((jobsData: Job[]) => {
          this.jobserve.jobs = jobsData;
         
      });
  }
  
    deleteJob(i:number,job:Job){
      this.jobserve.deleteJob(i,job);
    }
}
