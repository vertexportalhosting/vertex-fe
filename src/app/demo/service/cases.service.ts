import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../api/customer';
import { Observable } from 'rxjs';

@Injectable()
export class CasesService {
  private baseUrl = 'http://localhost:3000';


  constructor(private http: HttpClient) { }

  getCases(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cases`);
  }

  createCase(payload:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/cases`, payload);
  }

  deleteCase(caseId: string): Observable<void> {
    const url = `${this.baseUrl}/cases/${caseId}`;
    return this.http.delete<void>(url);
  }
}
