import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiServiceService } from '../../../services/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { ShareService } from '../../../services/share.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm : FormGroup
  loginFormValid : boolean = false
  apiService = inject(ApiServiceService)
  toastr = inject(ToastrService)
  router = inject(Router)
  isLogginIn:boolean = false
  shareData = inject(ShareService)

  constructor() {
    this.loginForm = new FormGroup({
      userEmail : new FormControl("", [Validators.required, Validators.email]),
      userPassword : new FormControl("", [Validators.required, Validators.minLength(8)])
    })
  }

  login() {
    this.loginForm.markAllAsTouched()
    this.loginFormValid = this.loginForm.valid
    if (this.loginFormValid) {
      this.isLogginIn = true
      const formData = this.loginForm.value
      const loginData = {
        email : formData.userEmail,
        password : formData.userPassword
      }
      this.apiService.login(loginData).subscribe({
        next:(res:any) => {
          this.toastr.clear()
          if (res.success && (res.data.role !='' || res.data.role != undefined)) {
            if (res.data.role == 1) {
              this.router.navigateByUrl('/vendor')
              this.toastr.success(res.message)
              this.setUserDetails(res.data)
            } else if (res.data.role == 2) {
              this.router.navigateByUrl('/search')
              this.toastr.success(res.message)
              this.setUserDetails(res.data)
            } else if (res.data.role == 0) {
              this.toastr.success("Super admin.")
              this.toastr.success(res.message)
            } else {
              this.toastr.error("Invalid user")
            }
          } else {
            this.isLogginIn = false
            this.toastr.error(res.message)
          }
        },
        error:(error:any) => {
          console.log('Login api error', 'Server error')
        }
      })
    }
  }

  setUserDetails(userData:any) {
    console.log(userData)
    this.shareData.userDetails.next({
      name:userData.name,
      email:userData.email,
      token:userData.token,
      role:userData.role
    })
  }
}
