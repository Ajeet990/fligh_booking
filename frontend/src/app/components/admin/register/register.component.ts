import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../../../services/api-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  imageSelected : boolean = false
  imageContent : any
  registerForm : FormGroup
  toastr = inject(ToastrService)
  // http = inject(HttpClient)
  apiService = inject(ApiServiceService)
  router = inject(Router)
  isRegistering : boolean = false
  // isFormSubmitted : boolean = false
  constructor() {
    this.registerForm = new FormGroup({
      userName : new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      userEmail : new FormControl("", [Validators.required, Validators.email]),
      userPassword : new FormControl("", [Validators.required, Validators.minLength(8)]),
      userPhone : new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern('^[0-9]*$')]),
      role : new FormControl("", [Validators.required]),
    })
  }

  registerUser(event:any) : any {
    // debugger;
    this.toastr.clear()
    this.imageContent = event?.currentTarget?.form[5]?.files[0]
    const isFormValid = this.registerForm.valid;

    this.registerForm.markAllAsTouched()
    if (this.imageContent?.name == '' || this.imageContent?.name == undefined) {
      this.toastr.error("Please select image.", "No image")
      return false;
    }
    if (!isFormValid) {
      this.toastr.error("Please fill all the fields", "Error")
      return false;
    }
    this.isRegistering = true
    const imageObj = new FormData()
    imageObj.append('file', this.imageContent)
    this.apiService.uploadImage(imageObj).subscribe({
      next:(response:any) => {
        // console.log(response)
        if (response.success) {
          const imageLink = response.link
          const formData = this.registerForm.value
          const registerData = {
            name:formData.userName,
            email : formData.userEmail,
            password : formData.userPassword,
            phone : formData.userPhone,
            role : formData.role,
            image : imageLink
          }
          this.apiService.register(registerData).subscribe({
            next:(res:any) => {
              if (res.success) {
                this.router.navigateByUrl('/login')
                this.toastr.success(res.message)
              } else {
                this.toastr.error(res.message)
              }

            },
            error: (error:any) => {
              console.log("Api error.")
            }
          })

        } else {
          this.toastr.error(response.message, 'Error')
        }
        //code to get response and do another work
      },
      error: (error:any) => {
        // console.log("Api error")
        this.toastr.error("Server issue", 'API error')
      }
    })
    
  }
}
