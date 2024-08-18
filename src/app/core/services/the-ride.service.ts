import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TheRideService {
    private apiUrl = 'http://numxlator.com:7070/';

    constructor(private http: HttpClient) {
    }

    riderLogin(data: any): Observable<any> {
        return this.http.post<any>(this.apiUrl + 'ride-share/user/rider/login', data);
    }

    driverLogin(data: any): Observable<any> {
        return this.http.post<any>(this.apiUrl + 'ride-share/user/driver/login', data);
    }

    registerRider(data: any): Observable<any> {
        return this.http.post<any>(this.apiUrl + 'ride-share/admin/create-rider', data);
    }

    registerDriver(data: any): Observable<any> {
        return this.http.post<any>(this.apiUrl + 'ride-share/admin/create-driver', data);
    }

    setRiderLocation(data: any): Observable<any> {
        return this.http.post<any>(this.apiUrl + `ride-share/user/rider/publish-geocode`, data);
    }

    setDriverLocation(data: any): Observable<any> {
        return this.http.post<any>(this.apiUrl + `ride-share/user/driver/publish-geocode`, data);
    }

    getCurrentTripStatus(userEmail: string, driverEmail: string): Observable<any> {
        return this.http.get<any>(this.apiUrl + `ride-share/user/get-driver-details/${driverEmail}/${userEmail}`);
    }

    searchForARide(location: any): Observable<any> {
        return this.http.get<any>(this.apiUrl + `ride-share/user/find-nearby-rides/${location.longitude}/${location.latitude}`);
    }

    cancelRequest(data: any): Observable<any> {
        return this.http.post<any>(this.apiUrl + `ride-share/user/cancel-request`, data);
    }

    checkForRequestStatus(data: any): Observable<any> {
        return this.http.get<any>(this.apiUrl + `ride-share/user/check-request-status/${data.email}/${data.bookingId}`);
    }

    getRideRequests(driverEmail: any): Observable<any> {
        return this.http.get<any>(this.apiUrl + `ride-share/user/check-for-request/${driverEmail}`);
    }

    acceptRideRequest(data: any) {
        return this.http.post<any>(this.apiUrl + 'ride-share/user/accept-request', data);
    }

    declineRideRequest(data: any) {
        return this.http.post<any>(this.apiUrl + 'ride-share/user/decline-request', data);
    }

    declineAllRideRequest(driverEmail: string): Observable<any> {
        return this.http.get<any>(this.apiUrl + `ride-share/user/decline-all-requests/${driverEmail}`);
    }

    requestRide(data: any) {
        return this.http.post<any>(this.apiUrl + 'ride-share/user/request-ride', data);
    }

    endRideRequest(data: any) {
        return this.http.post<any>(this.apiUrl + 'ride-share/user/end-request', data);
    }
}
