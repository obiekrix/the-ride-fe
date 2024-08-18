import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {TheRideService} from "../../core/services/the-ride.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private theRideService: TheRideService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+234[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  getRandomNumber(min: any, max: any) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      const payload = {
        "name": this.registerForm.value.name,
        "phoneNo": this.registerForm.value.phone,
        "email": this.registerForm.value.email,
        "password": this.registerForm.value.password,
        "longitude": this.getRandomNumber(0, 1000),
        "latitude": this.getRandomNumber(0, 1000)
      }
      this.theRideService.registerRider(payload).subscribe({
        next: res => {
          if (res) {
            localStorage.setItem('userData', JSON.stringify(res));
            this.router.navigate(['/rider-home-page']);
          }
        },
        error: err => {
          alert('Something went wrong');
        }
      })
    }
  }

}
