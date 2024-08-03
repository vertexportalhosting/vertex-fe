/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NewUser } from '../../models/new-user';
import { User } from '../../models/user';

export interface SignUp$Params {
      body?: NewUser
}

export function signUp(http: HttpClient, rootUrl: string, params?: SignUp$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
  const rb = new RequestBuilder(rootUrl, signUp.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<User>;
    })
  );
}

signUp.PATH = '/signup';
