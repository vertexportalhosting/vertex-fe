import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    loading$ = new BehaviorSubject(false);
    constructor() {

    }

    getUserRole() {
        return JSON.parse(localStorage.getItem('token'))?.role;
    }

    showLoader() {
        this.loading$.next(true)
    }

    hideLoader() {
        this.loading$.next(false)
    }


}