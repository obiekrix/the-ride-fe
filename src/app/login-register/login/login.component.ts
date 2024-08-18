import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {TheRideService} from "../../core/services/the-ride.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private theRideService: TheRideService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(route: string) {
    if (this.loginForm.valid) {
      console.log('Login successful:', this.loginForm.value);
      this.router.navigate([route]);
    }
  }

  riderLogin(): void {
    this.theRideService.riderLogin(this.loginForm.value).subscribe({
      next: res => {
        if (res) {
          localStorage.setItem('userData', JSON.stringify(res));
          this.router.navigate(['/rider-home-page']);
        }
      },
      error: err => {
        alert('Your username or password is incorrect');
      }
    })
  }

  driverLogin(): void {
    this.theRideService.driverLogin(this.loginForm.value).subscribe({
      next: res => {
        if (res) {
          localStorage.setItem('driverData', JSON.stringify(res));
          this.router.navigate(['/driver-home-page']);
        }
      },
      error: err => {
        alert('Your username or password is incorrect');
      }
    })
  }
}
