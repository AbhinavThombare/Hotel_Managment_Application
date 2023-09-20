import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NodeServerApiService } from 'src/app/services/node-server-api/node-server-api.service';
import { NotificationAlertService } from 'src/app/services/notification-alert/notification-alert.service';
// import { NotificationApiService } from 'src/app/services/Notification-Api/notification-api.service';
// import { NodeServerApiService } from '../../services/Node-Server-Api/node-server-api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup;
  message_error = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter Valid Email Address' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
    ],
  }
  token: any;
  // resToken: Object | undefined | null ;
  constructor(
    private formBuilder: FormBuilder,
    private nodeserverapi: NodeServerApiService,
    private notificationapi: NotificationAlertService,
    private router: Router
  ) {
    this.loginform = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const userData = this.loginform.value

    this.nodeserverapi.loginUser(userData).subscribe(
      (res) => {
        console.log(res)
        if (res.status === 200) {
          // this.token = res.body
          // this.token = JSON.parse(this.resToken)

          let resSTR = JSON.stringify(res.body)
          let resPAR = JSON.parse(resSTR)
          this.token = resPAR.token
          const data = {
            value: this.token,                  // store the value within this object
            expiry: Date.now() + 600000,   // store the TTL (time to live)
          }
          localStorage.setItem('token', JSON.stringify(data))
          console.log(localStorage.getItem('token'))
          this.router.navigate(['/home'],{queryParams:{token:this.token}})
          this.notificationapi.loginAlert('Login Successfull!')
        }
      },
      (error) => {
        if (error.status === 0) {
          this.notificationapi.errorAlert('Server Error, Please Try Again Later!')
        }
        else {
          this.notificationapi.errorAlert(error.error)

        }
      }
    )

  }
}
