/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Count as LoopbackCount } from '../../models/loopback/count';
import { TodoPartial } from '../../models/todo-partial';

export interface UpdateAll$Params {
  where?: any;
      body?: TodoPartial
}

export function updateAll(http: HttpClient, rootUrl: string, params?: UpdateAll$Params, context?: HttpContext): Observable<StrictHttpResponse<LoopbackCount>> {
  const rb = new RequestBuilder(rootUrl, updateAll.PATH, 'patch');
  if (params) {
    rb.query('where', params.where, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LoopbackCount>;
    })
  );
}

updateAll.PATH = '/todos';
