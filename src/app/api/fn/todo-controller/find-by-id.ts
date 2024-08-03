/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TodoWithRelations } from '../../models/todo-with-relations';

export interface FindById$Params {
  id: number;
  filter?: any;
}

export function findById(http: HttpClient, rootUrl: string, params: FindById$Params, context?: HttpContext): Observable<StrictHttpResponse<TodoWithRelations>> {
  const rb = new RequestBuilder(rootUrl, findById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
    rb.query('filter', params.filter, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TodoWithRelations>;
    })
  );
}

findById.PATH = '/todos/{id}';
