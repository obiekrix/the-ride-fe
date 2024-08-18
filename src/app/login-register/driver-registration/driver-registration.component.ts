import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {TheRideService} from "../../core/services/the-ride.service";

@Component({
  selector: 'app-driver-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './driver-registration.component.html',
  styleUrl: './driver-registration.component.scss'
})
export class DriverRegistrationComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private theRideService: TheRideService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\+234[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      license: ['', Validators.required],
      carMake: ['', Validators.required],
      carColour: ['', Validators.required],
      registration: ['', Validators.required]
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
        "driverLicense": this.registerForm.value.license,
        "carRegistrationNo": this.registerForm.value.registration,
        "carMake": this.registerForm.value.carMake,
        "carColor": this.registerForm.value.carColour,
        "longitude": this.getRandomNumber(0, 1000),
        "latitude": this.getRandomNumber(0, 1000)
      }
      this.theRideService.registerDriver(payload).subscribe({
        next: res => {
          if (res) {
            localStorage.setItem('driverData', JSON.stringify(res));
            this.router.navigate(['/driver-home-page']);
          }
        },
        error: err => {
          alert('Something went wrong');
        }
      })
    }
  }
}
