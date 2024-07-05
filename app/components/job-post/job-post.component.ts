import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostingService } from '../../services/service-posting/posting.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrl: './job-post.component.css'
})
export class JobPostComponent {
  yourForm: FormGroup;
  
    constructor(private jobservices:PostingService , private route:Router,private fb: FormBuilder){
     this.yourForm = this.fb.group({
       controltitle: ['', Validators.required],
       controlCompanyName: ['', Validators.required],
       controlJobDescription: ['', Validators.required],
       controlJobRequirement: ['', Validators.required],
       controlJobSalary: ['', [Validators.required, Validators.min(0)]],
       controlJobDeadline: ['', Validators.required],
        // Make the field required
     });

    }
   //  submitJob(jobtitle:any,companyname:any,jobdescription:any,jobrequirement:any,jobsalary:any,jobdeadline:any){
   //       this.jobservices.submitJob(jobtitle.value,companyname.value,jobdescription.value,jobrequirement.value,jobsalary.value,jobdeadline.value);
   //       this.route.navigate(['Manage-Post']);
   //  }
    onSubmit() {
     // Check if the form is valid before submitting
     if (this.yourForm.valid) {
       const jobTitleControl = this.yourForm.get('controltitle');
       const companyNameControl = this.yourForm.get('controlCompanyName');
       const jobDescriptionControl = this.yourForm.get('controlJobDescription');
       const jobRequirementControl = this.yourForm.get('controlJobRequirement');
       const jobSalaryControl = this.yourForm.get('controlJobSalary');
       const applicationDeadlineControl = this.yourForm.get('controlJobDeadline');

       if (
         jobTitleControl &&
         companyNameControl &&
         jobDescriptionControl &&
         jobRequirementControl &&
         jobSalaryControl &&
         applicationDeadlineControl
     ) {
         const jobData = {
             jobTitle: jobTitleControl.value,
             companyName: companyNameControl.value,
             jobDescription: jobDescriptionControl.value,
             jobRequirement: jobRequirementControl.value,
             jobSalary: jobSalaryControl.value,
             applicationDeadline: applicationDeadlineControl.value,
            
         };
         this.jobservices.submitJob(jobData.jobTitle,jobData.companyName,jobData.jobDescription,
           jobData.jobRequirement,jobData.jobSalary,jobData.applicationDeadline);

       this.route.navigate(['Manage-Post']);
       console.log('Form is valid. Submitting data...');
       // Process form data here
      
       console.log(this.yourForm.value);
     } else {
       console.log('Form is invalid');
     // Optionally, mark all controls as touched to trigger validation messages
     this.yourForm.markAllAsTouched();
     }
   }

 }}
