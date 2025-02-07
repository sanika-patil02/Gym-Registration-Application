import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { SharedsericeService } from '../services/sharedserice.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{

  userId!:number;
  // public userDetails!:User;
  userD!: User[];
  dataSource: any;


  // @Inject(MAT_DIALOG_DATA) public data: any,
  constructor(private service:SharedsericeService,private activateRoutes:ActivatedRoute,private api:ApiService){

  }
  ngOnInit(){
    
    this.activateRoutes.params.subscribe(val=>{
      this.userId=val['gymRegisteredUser_pk'];
      // this.fetchUserDetails(this.userId);
    this.getUsers();
    })
    // this.tabledata = this.data;
    // this.userId=this.tabledata.type;
    // this.getUsers();
    // this.onSelect(this.userId);

  }


  getUsers(){
    // this.api.getRegisterUser().subscribe(res=>{
    //   this.users=res;
    //   this.dataSource=new MatTableDataSource(this.users)
    //   this.dataSource.paginator=this.paginator;
    //   this.dataSource.sort=this.sort;
    // })
   
    this.service.getRegisteredUserList().subscribe(res=>{
      this.userD=res;
      this.dataSource=new MatTableDataSource(this.userD);
      // this.dataSource.paginator=this.paginator;
      // this.dataSource.sort=this.sort;
    })

  }

// onSelect(userId: number) {
//     debugger
    
//     this.userDetails = this.userDetails.filter((item) => item.gymRegisteredUser_pk == userId);
//     console.log(this.userDetails)
//   }
  fetchUserDetails(userId:number){
    // this.api.getRegisteredUserId(userId)
    // .subscribe(res=>{
    //   this.userDetails=res;
    // })
  
    // this.service.getbyId(userId)
    // .subscribe(res=>{

    //   this.userDetails=res;
    
    //   console.log(this.userDetails);
    // })
 
  }



}


