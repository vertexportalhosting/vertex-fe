/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PatientWithRelations } from '../../models/patient-with-relations';

export interface Find$Params {
  filter?: any;
}

export function find(http: HttpClient, rootUrl: string, params?: Find$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PatientWithRelations>>> {
  const rb = new RequestBuilder(rootUrl, find.PATH, 'get');
  if (params) {
    rb.query('filter', params.filter, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<PatientWithRelations>>;
    })
  );
}

find.PATH = '/patients';
