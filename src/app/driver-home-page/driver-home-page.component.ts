import {Component, OnInit} from '@angular/core';
import {TheRideService} from "../core/services/the-ride.service";
import {interval, switchMap} from "rxjs";
import {NgForOf, NgIf} from "@angular/common";


@Component({
  selector: 'app-driver-home-page',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './driver-home-page.component.html',
  styleUrl: './driver-home-page.component.scss'
})
export class DriverHomePageComponent implements OnInit {
  options: any;
  rideRequests: any[] = [];
  driverData: any

  currentRideData: any;

  constructor(
    private rideRequestService: TheRideService,
    private theRideService: TheRideService
  ) {}

  ngOnInit() {
    this.driverData = JSON.parse(localStorage.getItem('driverData') as string)
    setInterval(() => {
      this.driverData = JSON.parse(localStorage.getItem('driverData') as string)
    }, 2000)

    this.getDriverLocation();
    this.pollForRideRequests();
  }

  getRandomNumber(min: any, max: any) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getDriverLocation() {
    setInterval(() => {
      const payload = {
        "email": this.driverData.email,
        "longitude": this.getRandomNumber(0, 1000),
        "latitude": this.getRandomNumber(0, 1000)
      }
      this.theRideService.setDriverLocation(payload).subscribe(res => {
        localStorage.setItem('driverData', JSON.stringify(res));
      });
    }, 5000)
  }

  pollForRideRequests() {
    interval(5000).pipe(
      switchMap(() => this.rideRequestService.getRideRequests(this.driverData.email))
    ).subscribe(requests => {
      this.rideRequests = requests;
    });
  }

  acceptRide(rideRequest: any) {
    const payload = {
      "bookingId": rideRequest.id,
      "email": rideRequest.driverResponse.email
    }
    this.theRideService.acceptRideRequest(payload).subscribe(response => {
      console.log('Ride accepted:', response);
      alert(`Request accepted. Do have a pleasant trip`);
      this.currentRideData = response
    });
    this.theRideService.declineAllRideRequest(this.driverData.email).subscribe(response => {
      console.log('Other ride request has been deleted as this driver is now engaged in a trip:', response);
      alert(`Your other requests will be automatically declined since you are now starting a new trip`);
      this.currentRideData = response
    });
  }

  declineRide(rideRequest: any) {
    const payload = {
      "bookingId": rideRequest.id,
      "email": rideRequest.driverResponse.email
    }
    this.theRideService.declineRideRequest(payload).subscribe(response => {
      console.log('Ride declined:', response);
      alert(`You have successfully declined this ride request`);
    });
  }

  endRide(rideRequest: any) {
    const payload = {
      "bookingId": rideRequest.id,
      "email": rideRequest.driverResponse.email
    }
    this.theRideService.endRideRequest(payload).subscribe(response => {
      console.log('Ride ended:', response);
      alert(`You have successfully ended this ride request`);
    });
    this.currentRideData = null
  }
}
