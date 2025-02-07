import { Component,  OnChanges,  OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { SharedsericeService } from '../services/sharedserice.service';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent  implements OnInit,OnChanges{
  public packages=[
    "Monthly","Quaterly","Yearly"
  ];
  public genders=["Male","Female"];

  public importantList:string[]=[
    "Toxic Fat Reduction",
    "Energy and Endurance",
    "Building Lean Muscle",
    "Healthier Digestive System",
    "Sugar Craving body",
    "Fitness"

  ];

  public registerForm!:FormGroup;
  public userIdToUpdate!:number;
  public isUpdateActive:boolean=false;
detail!:User;
  constructor(private service:SharedsericeService,private fb:FormBuilder,private activateRouter:ActivatedRoute,private api:ApiService,private toastService:NgToastService,private router:Router){

  }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.registerForm=this.fb.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:['',[Validators.required, Validators.pattern('^[0-9]{10}$')]],
      weight:[''],
      height:[''],
      bmi:[''],
      bmiResult:[''],
      gender:[''],
      requireTrainer:[''],
      package:[''],
      // important:[''],
      haveGymbefore:[''],
      enquiryDate:['']
    });

    this.registerForm.controls['height'].valueChanges.subscribe(res=>{
      this.calculateBmi(res);
    }); 

    this.activateRouter.params.subscribe(
      val=>{
        this.userIdToUpdate=val['gymRegisteredUser_pk'];
        // this.service.getbyId(this.userIdToUpdate).subscribe(
        //   res=>{
        //     this.isUpdateActive=true;
        //     this.fillFormToUpdate(res);
        //   }
        // )
        if (this.userIdToUpdate) {
        
          this.service.getRegisteredUserList()
            .subscribe(
              // next: (res) => {
                res=>{
                  this.isUpdateActive=true;
                  for(var userDetails of res){
                    if(userDetails.gymRegisteredUser_pk==this.userIdToUpdate){
                      console.log(userDetails.value);
                      this.detail=userDetails;
                      this.fillFormToUpdate(userDetails);
                    }
                  }
                
                }
              // },
              // error: (err) => {
              //   console.log(err);
              // }

            )
        }
     
      }
    );
  }

submit(){
  // this.api.postRegistration(this.registerForm.value)
  // .subscribe(res => {
  //   this.toastService.success({ detail: 'SUCCESS', summary: 'Registration Successful', duration: 3000 });
  //   this.registerForm.reset();
  // });
  
  this.service.posttRegisteredUser(this.registerForm.value,"PostGym")
  .subscribe(res => {
    this.toastService.success({ detail: 'SUCCESS', summary: 'Registration Successful', duration: 3000 });
    this.registerForm.reset();
  });
}

calculateBmi(heightValue:number){
  const weight=this.registerForm.value.weight;
  const height=heightValue;
  const bmi=(weight)/(height*height);
  this.registerForm.controls['bmi'].patchValue(bmi);

  switch(true){
    case bmi<18.5:
      this.registerForm.controls['bmiResult'].patchValue("Under Weight");
      break;
      case (bmi>=18.5 && bmi<25):
      this.registerForm.controls['bmiResult'].patchValue("Normal");
      break;
      case (bmi>=25 && bmi<30):
      this.registerForm.controls['bmiResult'].patchValue("OverWeight");
      break;

      default:
        this.registerForm.controls['bmiResult'].patchValue("Obese");
      break;
  }
}


fillFormToUpdate(user:User){
this.registerForm.setValue({
  firstName:user.firstName,
  lastName:user.lastName,
  email:user.email,
  mobile:user.mobile,
  weight:user.weight,
  height:user.height,
  bmi:user.bmi,
  bmiResult:user.bmiResult,
  gender:user.gender,
  requireTrainer:user.requireTrainer,
  package:user.package,
  // important:user.important,
  haveGymbefore:user.haveGymbefore,
  enquiryDate:user.enquiryDate,
  gymRegisteredUser_pk:user.gymRegisteredUser_pk
})
}

update(){
  // this.api.updateRegisterUser(this.registerForm.value,this.userIdToUpdate)
  // .subscribe(res=>{
  //   this.toastService.success({detail:"Success",summary:"Enquiry Updated",duration:3000});
  //   this.registerForm.reset();
  //   this.router.navigate(['list']);
  // })

// debugger

  this.service.updateRegisteredUser(this.registerForm.value.gymRegisteredUser_pk,this.registerForm.value)
  .subscribe(res=>{
    this.toastService.success({detail:"Success",summary:"Enquiry Updated",duration:3000});
    this.registerForm.reset();
    this.router.navigate(['list']);
  })
}


}
