import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {TheRideService} from "../core/services/the-ride.service";

interface DriverProfile {
    name: string;
    phoneNo: string;
    email: string;
    driverLicense: string;
    carRegistrationNo: string;
    carMake: string;
    carColor: string;
    longitude: number;
    latitude: number;
}

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        FormsModule,
        NgIf,
        NgForOf
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    destination: string = '';
    rides: any[] = [];
    userData: any
    currentTrip: any
    isRideOnGoing = false;
    isRideRequestEnded = false;
    isRideRequestDeclined = false;

    constructor(
        private theRideService: TheRideService
    ) {
    }

    ngOnInit() {
        this.userData = JSON.parse(localStorage.getItem('userData') as string)
        this.rides = [];

        setInterval(() => {
            const payload = {
                "email": this.userData.email,
                "longitude": this.getRandomNumber(0, 1000),
                "latitude": this.getRandomNumber(0, 1000)
            }
            this.theRideService.setRiderLocation(payload).subscribe(res => {
                localStorage.setItem('userData', JSON.stringify(res));
            });
        }, 60000)
    }

    getCurrentTripStatus(driverEmail: string): void {
        setInterval(() => {
            this.theRideService.getCurrentTripStatus(this.userData.email, driverEmail).subscribe((res: any) => {
                if (res?.id) {
                    this.currentTrip = res;
                    this.isRideOnGoing = true;
                }
            });
        }, 1000)
    }

    getRandomNumber(min: any, max: any) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    searchNearbyRides() {
        this.isRideRequestEnded = false
        if (this.destination) {
            const userLocation = {
                longitude: this.userData.longitude,
                latitude: this.userData.latitude,
            }
            this.theRideService.searchForARide(userLocation).subscribe(res => {
                this.rides = res;
            });
        } else {
            alert('Enter your destination first')
        }
    }

    requestRide(data: DriverProfile) {
        const riderData: any = JSON.parse(localStorage.getItem('userData') as string)
        const payload = {
            "riderEmail": riderData.email,
            "driverEmail": data.email,
            "riderLongitude": riderData.longitude,
            "riderLatitude": riderData.latitude,
            "destinationLongitude": data.longitude,
            "destinationLatitude": data.latitude,
        }

        this.theRideService.requestRide(payload).subscribe(res => {
            this.currentTrip = res;
            alert(`Your ride request for ${data.carMake} with plate number ${data.carRegistrationNo} has been sent`);
            this.getCurrentTripStatus(res.driverResponse.email)
            this.checkForDecline()
            this.checkForEnd()
        });
    }

    checkForDecline(): void {
        const payload = {
            "bookingId": this.currentTrip.id,
            "email": this.currentTrip.riderResponse.email
        }

        const checkDeclineIntervalId = setInterval(() => {
            this.theRideService.checkForRequestStatus(payload).subscribe(res => {
                if (res.status === 'DECLINED') {
                    this.isRideRequestDeclined = true;
                    this.currentTrip = undefined
                    clearInterval(checkDeclineIntervalId)
                    this.rides = []
                }
            });
        }, 2000)
    }

    checkForEnd(): void {
        const payload = {
            "bookingId": this.currentTrip.id,
            "email": this.currentTrip.riderResponse.email
        }

        const checkEndIntervalId = setInterval(() => {
            this.theRideService.checkForRequestStatus(payload).subscribe(res => {
                if (res.status === 'ENDED') {
                    this.isRideRequestEnded = true;
                    this.currentTrip = undefined
                    this.isRideOnGoing = false
                    clearInterval(checkEndIntervalId)
                    this.rides = []
                }
            });
        }, 2000)
    }

    cancelRequest(): void {
        const payload = {
            "bookingId": this.currentTrip.id,
            "email": this.currentTrip.riderResponse.email
        }
        this.theRideService.cancelRequest(payload).subscribe(res => {
            this.currentTrip = undefined
        });
    }
}
