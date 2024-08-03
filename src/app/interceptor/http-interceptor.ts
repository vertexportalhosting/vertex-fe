import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';
import { StoreService } from '../demo/service/store.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private loader: StoreService) {}
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.loader.showLoader();
        const token = JSON.parse(localStorage.getItem('user'));
        // Clone the request to add additional headers
        let clonedRequest = req.clone();
        if (!req.url.includes('firebase')) {
         clonedRequest = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token?.token}`,
                },
            });
        }
        if (req.url.includes('upload')) {
            this.loader.showLoader();
        }
        return next.handle(clonedRequest).pipe(
            tap((data) => {
            }),
            finalize(() => this.loader.hideLoader())
        );
    }
}
