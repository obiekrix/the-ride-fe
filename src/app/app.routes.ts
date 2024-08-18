import { Routes } from '@angular/router';
import {LandingPageComponent} from "./login-register/landing-page/landing-page.component";
import {LoginComponent} from "./login-register/login/login.component";
import {RegisterComponent} from "./login-register/register/register.component";
import {DriverRegistrationComponent} from "./login-register/driver-registration/driver-registration.component";
import {RegistrationChoiceComponent} from "./login-register/registration-choice/registration-choice.component";
import {HomeComponent} from "./home/home.component";
import {DriverHomePageComponent} from "./driver-home-page/driver-home-page.component";
import {RideRequestDetailsComponent} from "./ride-request-details/ride-request-details.component";

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  { path: 'login', component: LoginComponent },
  { path: 'rider-registration', component: RegisterComponent },
  { path: 'driver-registration', component: DriverRegistrationComponent },
  { path: 'registration-choice', component: RegistrationChoiceComponent },
  { path: 'rider-home-page', component: HomeComponent },
  { path: 'driver-home-page', component: DriverHomePageComponent },
  { path: 'ride-request-details/:id', component: RideRequestDetailsComponent },
  { path: '**', redirectTo: '' }
];
