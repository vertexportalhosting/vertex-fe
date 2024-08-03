/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Case } from '../models/case';
import { CaseWithRelations } from '../models/case-with-relations';
import { count } from '../fn/case-controller/count';
import { Count$Params } from '../fn/case-controller/count';
import { create } from '../fn/case-controller/create';
import { Create$Params } from '../fn/case-controller/create';
import { deleteById } from '../fn/case-controller/delete-by-id';
import { DeleteById$Params } from '../fn/case-controller/delete-by-id';
import { find } from '../fn/case-controller/find';
import { Find$Params } from '../fn/case-controller/find';
import { findById } from '../fn/case-controller/find-by-id';
import { FindById$Params } from '../fn/case-controller/find-by-id';
import { Count as LoopbackCount } from '../models/loopback/count';
import { replaceById } from '../fn/case-controller/replace-by-id';
import { ReplaceById$Params } from '../fn/case-controller/replace-by-id';
import { updateAll } from '../fn/case-controller/update-all';
import { UpdateAll$Params } from '../fn/case-controller/update-all';
import { updateById } from '../fn/case-controller/update-by-id';
import { UpdateById$Params } from '../fn/case-controller/update-by-id';

@Injectable({ providedIn: 'root' })
export class CaseControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `caseControllerCount()` */
  static readonly CaseControllerCountPath = '/cases/count';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `count()` instead.
   *
   * This method doesn't expect any request body.
   */
  count$Response(params?: Count$Params, context?: HttpContext): Observable<StrictHttpResponse<LoopbackCount>> {
    return count(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `count$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  count(params?: Count$Params, context?: HttpContext): Observable<LoopbackCount> {
    return this.count$Response(params, context).pipe(
      map((r: StrictHttpResponse<LoopbackCount>): LoopbackCount => r.body)
    );
  }

  /** Path part for operation `caseControllerFindById()` */
  static readonly CaseControllerFindByIdPath = '/cases/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById$Response(params: FindById$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseWithRelations>> {
    return findById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById(params: FindById$Params, context?: HttpContext): Observable<CaseWithRelations> {
    return this.findById$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseWithRelations>): CaseWithRelations => r.body)
    );
  }

  /** Path part for operation `caseControllerReplaceById()` */
  static readonly CaseControllerReplaceByIdPath = '/cases/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `replaceById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  replaceById$Response(params: ReplaceById$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return replaceById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `replaceById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  replaceById(params: ReplaceById$Params, context?: HttpContext): Observable<any> {
    return this.replaceById$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `caseControllerDeleteById()` */
  static readonly CaseControllerDeleteByIdPath = '/cases/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById$Response(params: DeleteById$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return deleteById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById(params: DeleteById$Params, context?: HttpContext): Observable<any> {
    return this.deleteById$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `caseControllerUpdateById()` */
  static readonly CaseControllerUpdateByIdPath = '/cases/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateById$Response(params: UpdateById$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return updateById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateById(params: UpdateById$Params, context?: HttpContext): Observable<any> {
    return this.updateById$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `caseControllerFind()` */
  static readonly CaseControllerFindPath = '/cases';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `find()` instead.
   *
   * This method doesn't expect any request body.
   */
  find$Response(params?: Find$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CaseWithRelations>>> {
    return find(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `find$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  find(params?: Find$Params, context?: HttpContext): Observable<Array<CaseWithRelations>> {
    return this.find$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CaseWithRelations>>): Array<CaseWithRelations> => r.body)
    );
  }

  /** Path part for operation `caseControllerCreate()` */
  static readonly CaseControllerCreatePath = '/cases';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create$Response(params?: Create$Params, context?: HttpContext): Observable<StrictHttpResponse<Case>> {
    return create(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `create$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create(params?: Create$Params, context?: HttpContext): Observable<Case> {
    return this.create$Response(params, context).pipe(
      map((r: StrictHttpResponse<Case>): Case => r.body)
    );
  }

  /** Path part for operation `caseControllerUpdateAll()` */
  static readonly CaseControllerUpdateAllPath = '/cases';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAll()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAll$Response(params?: UpdateAll$Params, context?: HttpContext): Observable<StrictHttpResponse<LoopbackCount>> {
    return updateAll(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateAll$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAll(params?: UpdateAll$Params, context?: HttpContext): Observable<LoopbackCount> {
    return this.updateAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<LoopbackCount>): LoopbackCount => r.body)
    );
  }

}
