import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { StoreService } from './demo/service/store.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    loading = false;
    constructor(private primengConfig: PrimeNGConfig, public loader: StoreService) {}
    ngOnInit() {
        this.primengConfig.ripple = true;
    }


}
