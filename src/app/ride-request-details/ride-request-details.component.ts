import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TheRideService} from "../core/services/the-ride.service";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-ride-request-details',
    standalone: true,
    imports: [
        NgIf
    ],
    templateUrl: './ride-request-details.component.html',
    styleUrl: './ride-request-details.component.scss'
})
export class RideRequestDetailsComponent implements OnInit {
    rideRequest: any;

    constructor(
        private router: Router,
        private theRideService: TheRideService
    ) {
    }

    ngOnInit(): void {
    }

    acceptRide() {
        if (this.rideRequest) {
            const payload = {
                "bookingId": this.rideRequest.id,
                "email": "Christian@website.com"
            }
            this.theRideService.acceptRideRequest(this.rideRequest.id).subscribe(response => {
                console.log('Ride accepted:', response);
                alert(`Ride accepted. Your passenger is waiting for you`);
                this.router.navigate(['/']);
            });
        }
    }

    declineRide() {
        if (this.rideRequest) {
            this.theRideService.declineRideRequest(this.rideRequest.id).subscribe(response => {
                console.log('Ride declined:', response);
                alert(`You have successfully declined this ride request`);
                this.router.navigate(['/']);
            });
        }
    }
}
