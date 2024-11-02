import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    constructor() {}
    loading$ = new BehaviorSubject(false);
    readonly getcaseId$ = new BehaviorSubject<any>(null);

    setCaseId(caseId: number) {
    this.getcaseId$.next(caseId);
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