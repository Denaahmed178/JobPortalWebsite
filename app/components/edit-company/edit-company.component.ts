import { Component } from '@angular/core';
import { CompanyServeService } from '../../services/company-service/company-serve.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrl: './edit-company.component.css'
})
export class EditCompanyComponent {

  company:any
  com_id :any
  constructor(public comservices:CompanyServeService,private route:ActivatedRoute,
    private router:Router){}
  ngOnInit(): void {
    this.com_id= this.route.snapshot.paramMap.get('id');
    this.company= this.comservices.company[this.com_id];
  }
  EditCompany(){
    this.comservices.Editpost(this.com_id,this.company);
    this.router.navigate(['Company-Profile']);
  }
}
