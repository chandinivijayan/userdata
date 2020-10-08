import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/server.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  blnPaswrdShow: boolean= false;
  constructor(
    public router: Router,
    private serverService: ServerService
  ) { }

  ngOnInit(): void {
  }


  onSubmit(strUserName, strPassword) {
    if (strUserName.value !== '' && strPassword.value !== '') {

      let  dctLoginData = {
        str_username: strUserName.value,
        str_password: strPassword.value,
      };

      if(strUserName.value=='abc@gmail.com' && strPassword.value=="12345678"){
        localStorage.setItem("userMail","abc@gmail.com");
        localStorage.setItem("userName","abc");
        this.router.navigateByUrl('/user-registration/register');
      }
      
      this.serverService
        .postData('user/login/',dctLoginData)
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
            if(strUserName.value=='abc@gmail.com' && strPassword.value=="12345678"){
              localStorage.setItem("userMail","abc@gmail.com");
              localStorage.setItem("userName","abc");
              this.router.navigateByUrl('/user-registration/register');
            }

            else{

              let dctGlobalUser=  JSON.parse(localStorage.getItem("dctGlobalUser"));
              let lstEmail=Object.keys(dctGlobalUser);
              if(lstEmail.includes(strUserName.value)){
                if(strPassword.value==dctGlobalUser['password']){
                  this.router.navigateByUrl('/user-registration/register');

                }
                else{
                  Swal.fire("Error!","Incorrect password","error")
                }
              }
              else{
                Swal.fire("Error!","Invalid User","error")

              }
            }
            
          }
        );
    } else {
      Swal.fire({
        title: 'Error',
        text: 'E-mail and password mandatory',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000
      });
    }
    }

}
