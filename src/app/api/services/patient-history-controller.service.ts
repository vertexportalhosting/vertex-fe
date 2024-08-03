/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { count } from '../fn/patient-history-controller/count';
import { Count$Params } from '../fn/patient-history-controller/count';
import { create } from '../fn/patient-history-controller/create';
import { Create$Params } from '../fn/patient-history-controller/create';
import { deleteById } from '../fn/patient-history-controller/delete-by-id';
import { DeleteById$Params } from '../fn/patient-history-controller/delete-by-id';
import { find } from '../fn/patient-history-controller/find';
import { Find$Params } from '../fn/patient-history-controller/find';
import { findById } from '../fn/patient-history-controller/find-by-id';
import { FindById$Params } from '../fn/patient-history-controller/find-by-id';
import { Count as LoopbackCount } from '../models/loopback/count';
import { PatientHistory } from '../models/patient-history';
import { PatientHistoryWithRelations } from '../models/patient-history-with-relations';
import { replaceById } from '../fn/patient-history-controller/replace-by-id';
import { ReplaceById$Params } from '../fn/patient-history-controller/replace-by-id';
import { updateAll } from '../fn/patient-history-controller/update-all';
import { UpdateAll$Params } from '../fn/patient-history-controller/update-all';
import { updateById } from '../fn/patient-history-controller/update-by-id';
import { UpdateById$Params } from '../fn/patient-history-controller/update-by-id';

@Injectable({ providedIn: 'root' })
export class PatientHistoryControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `patientHistoryControllerCount()` */
  static readonly PatientHistoryControllerCountPath = '/patient-histories/count';

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

  /** Path part for operation `patientHistoryControllerFindById()` */
  static readonly PatientHistoryControllerFindByIdPath = '/patient-histories/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById$Response(params: FindById$Params, context?: HttpContext): Observable<StrictHttpResponse<PatientHistoryWithRelations>> {
    return findById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById(params: FindById$Params, context?: HttpContext): Observable<PatientHistoryWithRelations> {
    return this.findById$Response(params, context).pipe(
      map((r: StrictHttpResponse<PatientHistoryWithRelations>): PatientHistoryWithRelations => r.body)
    );
  }

  /** Path part for operation `patientHistoryControllerReplaceById()` */
  static readonly PatientHistoryControllerReplaceByIdPath = '/patient-histories/{id}';

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

  /** Path part for operation `patientHistoryControllerDeleteById()` */
  static readonly PatientHistoryControllerDeleteByIdPath = '/patient-histories/{id}';

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

  /** Path part for operation `patientHistoryControllerUpdateById()` */
  static readonly PatientHistoryControllerUpdateByIdPath = '/patient-histories/{id}';

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

  /** Path part for operation `patientHistoryControllerFind()` */
  static readonly PatientHistoryControllerFindPath = '/patient-histories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `find()` instead.
   *
   * This method doesn't expect any request body.
   */
  find$Response(params?: Find$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PatientHistoryWithRelations>>> {
    return find(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `find$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  find(params?: Find$Params, context?: HttpContext): Observable<Array<PatientHistoryWithRelations>> {
    return this.find$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PatientHistoryWithRelations>>): Array<PatientHistoryWithRelations> => r.body)
    );
  }

  /** Path part for operation `patientHistoryControllerCreate()` */
  static readonly PatientHistoryControllerCreatePath = '/patient-histories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create$Response(params?: Create$Params, context?: HttpContext): Observable<StrictHttpResponse<PatientHistory>> {
    return create(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `create$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create(params?: Create$Params, context?: HttpContext): Observable<PatientHistory> {
    return this.create$Response(params, context).pipe(
      map((r: StrictHttpResponse<PatientHistory>): PatientHistory => r.body)
    );
  }

  /** Path part for operation `patientHistoryControllerUpdateAll()` */
  static readonly PatientHistoryControllerUpdateAllPath = '/patient-histories';

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
