import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/model/users';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import * as alertifyjs from 'alertifyjs';
import * as alertify from 'alertifyjs';
import { AlertifyService } from 'src/app/services/alertify.service';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm!:FormGroup;
  user!:Users;
  users: User[] = [];
  userSubmitted!: boolean;
  
  constructor(private formBuilder: FormBuilder,private userService: UserService,private alertifyService:AlertifyService) {}
  // ngOnInit(): void {
  //    this.registrationForm=new FormGroup({
  //     userName:new FormControl('',Validators.required),
  //     email: new FormControl(null, [Validators.required, Validators.email]),
  //     password:new FormControl(null,[Validators.required,Validators.minLength(8)]),
  //     confirmPassword:new FormControl(null,[Validators.required]),
  //     mobile:new FormControl(null,[Validators.required,Validators.maxLength(10)])
  //    },this.passwordMatchingValidator) ;
  // }

  ngOnInit():void {
    
    this.registrationForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    },{Validators:this.passwordMatchingValidator});
    //alertify().init();
  }
  
  passwordMatchingValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value || ''; // Use '' if null
      const confirmPassword = control.get('confirmPassword')?.value || ''; // Use '' if null
  
      if (password === confirmPassword) {
        return null; // Passwords match, no validation error
      } else {
        return { notmatched: true }; // Passwords don't match
      }
    };
  }

  userData():Users{
    return this.user={

      userName:this.userName.value,
      email:this.email.value,
      password:this.password.value,
      mobile:this.mobile.value

    }
  }
  get userName(){
    return  this.registrationForm.get('userName') as FormControl
  }

  get email(){
    return  this.registrationForm.get('email') as FormControl
  }

  get password(){
    return  this.registrationForm.get('password') as FormControl
  }

  // get confirmPassword(){
  //   return  this.registrationForm.get('confirmPassword') as FormControl
  // }

  get mobile(){
    return  this.registrationForm.get('mobile') as FormControl
  }
  onSubmit(){
    //store single user in local storage
   
    console.log("data:"+this.registrationForm.value );
  
    if(this.registrationForm.valid){
    //this.user=Object.assign(this.user,this.registrationForm.value)
    this.userService.addUser(this.userData());
    this.registrationForm.reset();
    this.userSubmitted=false;
    
     alertify.success("Congrats, you are successfully registered");
    }
    else{
      alertify.error("Kindly provicde the required fields");
    }
 
     

  }
  


}
