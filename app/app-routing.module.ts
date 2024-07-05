import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { SavedJobsComponent } from './components/saved-jobs/saved-jobs.component';
import { ApplicationReviewComponent } from './components/application-review/application-review.component';
import { LoginComponent } from './components/login/login.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { JobPostComponent } from './components/job-post/job-post.component';
import { ManagePostComponent } from './components/manage-post/manage-post.component';
import { CompanyRegistrationComponent } from './components/company-registration/company-registration.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AvailableJobsComponent } from './components/available-jobs/available-jobs.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import {JobFormComponent } from './components/job-form/job-form.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { HomeApplicantComponent } from './components/home-applicant/home-applicant.component';
import { ConfirmationPageComponent } from './components/confirmation-page/confirmation-page.component';
import { CompanyDashboardComponent } from './components/company-dashboard/company-dashboard.component';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { EditUserComponent } from './components/edit-userProfile/edit-user.component';

const routes: Routes = [
  //{ path: '', component: UserNavbarComponent },
  { path: 'saved-jobs', component: SavedJobsComponent },
  { path: 'app-application-review', component: ApplicationReviewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Company-Profile', component: CompanyProfileComponent },
  { path: 'Edit-Post/:id', component: EditPostComponent },
  { path: 'jobPost', component: JobPostComponent },
  { path: 'Manage-Post', component: ManagePostComponent },
  { path: 'user-registration', component: UserRegistrationComponent },
  { path: 'company-registration', component: CompanyRegistrationComponent },
  { path: 'user-Profile', component: UserProfileComponent },
  {path: 'available-jobs' , component: AvailableJobsComponent},
  {path : 'job-details/:id', component : JobDetailsComponent},
  {path : 'job-form/:id', component : JobFormComponent},
  {path : 'welcomepage' , component :WelcomePageComponent },
  {path : 'home-applicant' , component :HomeApplicantComponent },
  {path : 'confirmation' , component :ConfirmationPageComponent },
  {path : 'company-dashboard' , component :CompanyDashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' } ,// Redirect to login page by default
  {path:'Edit-Company',component:EditCompanyComponent},
  {path: 'edit-profile/:id' , component:EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
