import { Component, OnInit } from '@angular/core';
import { PostingService } from '../../services/service-posting/posting.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit{
  job : any;
  jobId:any;
  constructor(private jobservices:PostingService,
    private route:ActivatedRoute,private router:Router){}
  ngOnInit(): void {
    this.jobId= this.route.snapshot.paramMap.get('id');
    this.job= this.jobservices.jobs[this.jobId];
  }
  Editpost(){
    this.jobservices.Editpost(this.jobId,this.job);
    this.router.navigate(['Manage-Post']);
  }

}
