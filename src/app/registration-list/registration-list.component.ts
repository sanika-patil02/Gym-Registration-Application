import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';
import { SharedsericeService } from '../services/sharedserice.service';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit{

  public dataSource!:MatTableDataSource<User>;
  public users!:User[];
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  displayedColumns:string[]=['gymRegisteredUser_pk','firstName','lastName','email','mobile','bmiResult','gender','package','enquiryDate','action'];
 
  

  constructor(private dialog: MatDialog,private service:SharedsericeService,private api:ApiService,private router:Router,private confirmbox:NgConfirmService,private toastService:NgToastService){

  }
  ngOnInit(): void {
    this.getUsers();
  }


  getUsers(){
    // this.api.getRegisterUser().subscribe(res=>{
    //   this.users=res;
    //   this.dataSource=new MatTableDataSource(this.users)
    //   this.dataSource.paginator=this.paginator;
    //   this.dataSource.sort=this.sort;
    // })
    this.service.getRegisteredUserList().subscribe(res=>{
      this.users=res;
      this.dataSource=new MatTableDataSource(this.users);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(id:number){
    this.router.navigate(['update',id]);
  }

  delete(id:number){
    // this.confirmbox.showConfirm("Are You Sure Want To Delete ",
    // ()=>{
    //   this.api.deleteRegistered(id).subscribe(res=>{
    //     this.toastService.success({detail:"success",summary:"Deleted Succesfully",duration :3000})
    //     this.getUsers();
    //   })
    // },
    // ()=>{

    // });
    this.confirmbox.showConfirm("Are You Sure Want To Delete ",
    ()=>{
      this.service.deleteRegistereduser(id).subscribe(res=>{
        this.toastService.success({detail:"success",summary:"Deleted Succesfully",duration :3000})
        this.getUsers();
      })
    },
    ()=>{

    });
  }


  OpenUserDetails(title: any, type: any){
    debugger
    this.openPopup(0, title,type,UserDetailComponent)
  }
  openPopup(data: any, title: any,type:any, component: any) {
    var _popup = this.dialog.open(component, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
      }
    });
    _popup.afterClosed().subscribe(item => {
    })
  }

}
