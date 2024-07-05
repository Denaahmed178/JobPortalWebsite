import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditUserServiceService } from '../../services/edit-user-serivce/edit-user-service.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  user:any
  id :any
  name:any
  phoneNumber :any
  email :any
  address :any
  constructor(public userservices:EditUserServiceService,private route:ActivatedRoute,
    private router:Router){}
  ngOnInit(): void {
    this.id= this.route.snapshot.paramMap.get('id');
  }
  EditUser(){
    this.user = {
      name: this.name,
      phoneNumber: this.phoneNumber,
      email: this.email,
      address: this.address
    };
    this.userservices.EditUser(this.id,this.user);
    this.router.navigate(['user-Profile']);
  }
}
