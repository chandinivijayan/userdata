import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/server.service';
import { MustMatch } from 'src/app/shared/passwordvalidation';
import Swal from "sweetalert2";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serverService: ServerService,
    public router: Router,
    ) { }

  ngOnInit(): void {

    this.regForm = this.fb.group({
      FirstName: ['', Validators.required ],
      SecondName: ['', Validators.required ],
      userEmail:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      gender: [''],
      address:[''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
 },
 {
  validator: MustMatch('password', 'confirmPassword')
}
 );
  }
  

  registerUser() {
    console.log(this.regForm);

    if(this.regForm.status=='VALID'){
      this.serverService
      .postData('user/login/',this.regForm.value)
      .subscribe(
        (response: any) => {
          const logCheck = response;
          if ( logCheck['status'] === 1) {
            this.router.navigateByUrl('/user-registration/register');

          }
          else if( logCheck['status']==0){
            // Swal.fire({
            //   position: 'center',
            //   icon: 'error',
            //   text: logCheck['reason'],
            // });
          }
           else {
            // Swal.fire({
            //   position: 'center',
            //   icon: 'error',
            //   text: 'Invalid username or password',
            // });
          }
        },
        error => {
          let dctGlobalUser={}
        dctGlobalUser=  JSON.parse(localStorage.getItem("dctGlobalUser"));
        console.log(dctGlobalUser,"dctGlobalUser");
        let lstEmail=Object.keys(dctGlobalUser);
        if(lstEmail.includes(this.regForm['value']['userEmail'])){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error!',
            text: 'Mail id Already exist!',
          });
        }
        else{
          dctGlobalUser[this.regForm.controls.userEmail.value]=this.regForm.value;
          localStorage.setItem("dctGlobalUser",JSON.stringify(dctGlobalUser));
          this.regForm.reset();
        }
      
          
        }
      );
    }
  }

  clearFields() {
    this.regForm.reset();
  }
}
