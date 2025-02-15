/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { count } from '../fn/scan-controller/count';
import { Count$Params } from '../fn/scan-controller/count';
import { create } from '../fn/scan-controller/create';
import { Create$Params } from '../fn/scan-controller/create';
import { createAllScans } from '../fn/scan-controller/create-all-scans';
import { CreateAllScans$Params } from '../fn/scan-controller/create-all-scans';
import { deleteById } from '../fn/scan-controller/delete-by-id';
import { DeleteById$Params } from '../fn/scan-controller/delete-by-id';
import { fileUpload } from '../fn/scan-controller/file-upload';
import { FileUpload$Params } from '../fn/scan-controller/file-upload';
import { find } from '../fn/scan-controller/find';
import { Find$Params } from '../fn/scan-controller/find';
import { findById } from '../fn/scan-controller/find-by-id';
import { FindById$Params } from '../fn/scan-controller/find-by-id';
import { Count as LoopbackCount } from '../models/loopback/count';
import { replaceById } from '../fn/scan-controller/replace-by-id';
import { ReplaceById$Params } from '../fn/scan-controller/replace-by-id';
import { Scan } from '../models/scan';
import { ScanWithRelations } from '../models/scan-with-relations';
import { updateAll } from '../fn/scan-controller/update-all';
import { UpdateAll$Params } from '../fn/scan-controller/update-all';
import { updateById } from '../fn/scan-controller/update-by-id';
import { UpdateById$Params } from '../fn/scan-controller/update-by-id';

@Injectable({ providedIn: 'root' })
export class ScanControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `scanControllerCreateAllScans()` */
  static readonly ScanControllerCreateAllScansPath = '/createAllScans';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createAllScans()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAllScans$Response(params?: CreateAllScans$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return createAllScans(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createAllScans$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAllScans(params?: CreateAllScans$Params, context?: HttpContext): Observable<{
}> {
    return this.createAllScans$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `scanControllerCount()` */
  static readonly ScanControllerCountPath = '/scans/count';

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

  /** Path part for operation `scanControllerFindById()` */
  static readonly ScanControllerFindByIdPath = '/scans/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById$Response(params: FindById$Params, context?: HttpContext): Observable<StrictHttpResponse<ScanWithRelations>> {
    return findById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById(params: FindById$Params, context?: HttpContext): Observable<ScanWithRelations> {
    return this.findById$Response(params, context).pipe(
      map((r: StrictHttpResponse<ScanWithRelations>): ScanWithRelations => r.body)
    );
  }

  /** Path part for operation `scanControllerReplaceById()` */
  static readonly ScanControllerReplaceByIdPath = '/scans/{id}';

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

  /** Path part for operation `scanControllerDeleteById()` */
  static readonly ScanControllerDeleteByIdPath = '/scans/{id}';

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

  /** Path part for operation `scanControllerUpdateById()` */
  static readonly ScanControllerUpdateByIdPath = '/scans/{id}';

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

  /** Path part for operation `scanControllerFind()` */
  static readonly ScanControllerFindPath = '/scans';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `find()` instead.
   *
   * This method doesn't expect any request body.
   */
  find$Response(params?: Find$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ScanWithRelations>>> {
    return find(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `find$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  find(params?: Find$Params, context?: HttpContext): Observable<Array<ScanWithRelations>> {
    return this.find$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ScanWithRelations>>): Array<ScanWithRelations> => r.body)
    );
  }

  /** Path part for operation `scanControllerCreate()` */
  static readonly ScanControllerCreatePath = '/scans';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create$Response(params?: Create$Params, context?: HttpContext): Observable<StrictHttpResponse<Scan>> {
    return create(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `create$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create(params?: Create$Params, context?: HttpContext): Observable<Scan> {
    return this.create$Response(params, context).pipe(
      map((r: StrictHttpResponse<Scan>): Scan => r.body)
    );
  }

  /** Path part for operation `scanControllerUpdateAll()` */
  static readonly ScanControllerUpdateAllPath = '/scans';

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

  /** Path part for operation `scanControllerFileUpload()` */
  static readonly ScanControllerFileUploadPath = '/upload';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fileUpload()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  fileUpload$Response(params: FileUpload$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return fileUpload(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fileUpload$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  fileUpload(params: FileUpload$Params, context?: HttpContext): Observable<{
}> {
    return this.fileUpload$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
