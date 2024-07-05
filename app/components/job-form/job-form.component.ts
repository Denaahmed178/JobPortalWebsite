import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobFormserviceService } from '../../services/service-jobForm/job-formservice.service';
import { JobServiceService } from '../../services/service-job/job-service.service';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrl: './job-form.component.css'
})
export class JobFormComponent {
  user!: FormGroup;
  name_user: string= '';
  email_user: string= '';
  Phone_user:string= '';
  cv_user:string= '';
  isSubmit : boolean | undefined ;
  jobId: any;
  job: any;
  constructor(private jobform:JobFormserviceService,  private jobService:JobServiceService,private routeActive:ActivatedRoute,private route:Router,private fb: FormBuilder) {}
    ngOnInit(): void {
      this.jobId = this.routeActive.snapshot.paramMap.get("id")
    this.job = this.jobService.jobs[this.jobId] 
    }
// vaildation for empty strings 
    onSubmit(): void {
      this.isSubmit = this.jobform.addUser(this.name_user,this.email_user,this.Phone_user,this.cv_user,this.job.job_title);
      if(this.isSubmit){
          this.route.navigate(['/confirmation']);

      }
  }
}
  /**  onSubmit() {
    if (this.user.valid) {
      const userData = this.user.value;
      this.jobform.submit_user(userData.fullName, userData.email, userData.phone, userData.cv)
        .then(() => {
          console.log('Job application submitted successfully');
          this.route.navigate(['confirmation']);
        })
        .catch(error => {
          console.error('Error submitting job application:', error);
          // Handle error here
        });
    } else {
      console.log('Form is invalid');
      this.user.markAllAsTouched();
    }
  } */
 /* onSubmit() {
    // Call the service method to submit the job application
    this.jobform.submitJobApplication(this.fullName, this.email, this.phone, this.cvFile)
      .then(() => {
        console.log('Job application submitted successfully');
        // Add any success handling here, such as showing a success message to the user
      })
      .catch(error => {
        console.error('Error submitting job application:', error);
        // Add error handling here, such as showing an error message to the user
      });
  }*/



