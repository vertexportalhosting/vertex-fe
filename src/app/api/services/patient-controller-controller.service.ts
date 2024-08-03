/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { count } from '../fn/patient-controller-controller/count';
import { Count$Params } from '../fn/patient-controller-controller/count';
import { create } from '../fn/patient-controller-controller/create';
import { Create$Params } from '../fn/patient-controller-controller/create';
import { deleteById } from '../fn/patient-controller-controller/delete-by-id';
import { DeleteById$Params } from '../fn/patient-controller-controller/delete-by-id';
import { find } from '../fn/patient-controller-controller/find';
import { Find$Params } from '../fn/patient-controller-controller/find';
import { findById } from '../fn/patient-controller-controller/find-by-id';
import { FindById$Params } from '../fn/patient-controller-controller/find-by-id';
import { getPatientHistories } from '../fn/patient-controller-controller/get-patient-histories';
import { GetPatientHistories$Params } from '../fn/patient-controller-controller/get-patient-histories';
import { Count as LoopbackCount } from '../models/loopback/count';
import { Patient } from '../models/patient';
import { PatientHistory } from '../models/patient-history';
import { PatientWithRelations } from '../models/patient-with-relations';
import { replaceById } from '../fn/patient-controller-controller/replace-by-id';
import { ReplaceById$Params } from '../fn/patient-controller-controller/replace-by-id';
import { updateAll } from '../fn/patient-controller-controller/update-all';
import { UpdateAll$Params } from '../fn/patient-controller-controller/update-all';
import { updateById } from '../fn/patient-controller-controller/update-by-id';
import { UpdateById$Params } from '../fn/patient-controller-controller/update-by-id';

@Injectable({ providedIn: 'root' })
export class PatientControllerControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `patientControllerControllerCount()` */
  static readonly PatientControllerControllerCountPath = '/patients/count';

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

  /** Path part for operation `patientControllerControllerGetPatientHistories()` */
  static readonly PatientControllerControllerGetPatientHistoriesPath = '/patients/{id}/histories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatientHistories()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatientHistories$Response(params: GetPatientHistories$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PatientHistory>>> {
    return getPatientHistories(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPatientHistories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatientHistories(params: GetPatientHistories$Params, context?: HttpContext): Observable<Array<PatientHistory>> {
    return this.getPatientHistories$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PatientHistory>>): Array<PatientHistory> => r.body)
    );
  }

  /** Path part for operation `patientControllerControllerFindById()` */
  static readonly PatientControllerControllerFindByIdPath = '/patients/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById$Response(params: FindById$Params, context?: HttpContext): Observable<StrictHttpResponse<PatientWithRelations>> {
    return findById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById(params: FindById$Params, context?: HttpContext): Observable<PatientWithRelations> {
    return this.findById$Response(params, context).pipe(
      map((r: StrictHttpResponse<PatientWithRelations>): PatientWithRelations => r.body)
    );
  }

  /** Path part for operation `patientControllerControllerReplaceById()` */
  static readonly PatientControllerControllerReplaceByIdPath = '/patients/{id}';

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

  /** Path part for operation `patientControllerControllerDeleteById()` */
  static readonly PatientControllerControllerDeleteByIdPath = '/patients/{id}';

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

  /** Path part for operation `patientControllerControllerUpdateById()` */
  static readonly PatientControllerControllerUpdateByIdPath = '/patients/{id}';

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

  /** Path part for operation `patientControllerControllerFind()` */
  static readonly PatientControllerControllerFindPath = '/patients';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `find()` instead.
   *
   * This method doesn't expect any request body.
   */
  find$Response(params?: Find$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PatientWithRelations>>> {
    return find(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `find$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  find(params?: Find$Params, context?: HttpContext): Observable<Array<PatientWithRelations>> {
    return this.find$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PatientWithRelations>>): Array<PatientWithRelations> => r.body)
    );
  }

  /** Path part for operation `patientControllerControllerCreate()` */
  static readonly PatientControllerControllerCreatePath = '/patients';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create$Response(params?: Create$Params, context?: HttpContext): Observable<StrictHttpResponse<Patient>> {
    return create(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `create$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create(params?: Create$Params, context?: HttpContext): Observable<Patient> {
    return this.create$Response(params, context).pipe(
      map((r: StrictHttpResponse<Patient>): Patient => r.body)
    );
  }

  /** Path part for operation `patientControllerControllerUpdateAll()` */
  static readonly PatientControllerControllerUpdateAllPath = '/patients';

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
