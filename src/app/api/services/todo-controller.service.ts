/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { count } from '../fn/todo-controller/count';
import { Count$Params } from '../fn/todo-controller/count';
import { create } from '../fn/todo-controller/create';
import { Create$Params } from '../fn/todo-controller/create';
import { deleteById } from '../fn/todo-controller/delete-by-id';
import { DeleteById$Params } from '../fn/todo-controller/delete-by-id';
import { find } from '../fn/todo-controller/find';
import { Find$Params } from '../fn/todo-controller/find';
import { findById } from '../fn/todo-controller/find-by-id';
import { FindById$Params } from '../fn/todo-controller/find-by-id';
import { Count as LoopbackCount } from '../models/loopback/count';
import { replaceById } from '../fn/todo-controller/replace-by-id';
import { ReplaceById$Params } from '../fn/todo-controller/replace-by-id';
import { Todo } from '../models/todo';
import { TodoWithRelations } from '../models/todo-with-relations';
import { updateAll } from '../fn/todo-controller/update-all';
import { UpdateAll$Params } from '../fn/todo-controller/update-all';
import { updateById } from '../fn/todo-controller/update-by-id';
import { UpdateById$Params } from '../fn/todo-controller/update-by-id';

@Injectable({ providedIn: 'root' })
export class TodoControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `todoControllerCount()` */
  static readonly TodoControllerCountPath = '/todos/count';

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

  /** Path part for operation `todoControllerFindById()` */
  static readonly TodoControllerFindByIdPath = '/todos/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById$Response(params: FindById$Params, context?: HttpContext): Observable<StrictHttpResponse<TodoWithRelations>> {
    return findById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById(params: FindById$Params, context?: HttpContext): Observable<TodoWithRelations> {
    return this.findById$Response(params, context).pipe(
      map((r: StrictHttpResponse<TodoWithRelations>): TodoWithRelations => r.body)
    );
  }

  /** Path part for operation `todoControllerReplaceById()` */
  static readonly TodoControllerReplaceByIdPath = '/todos/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `replaceById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  replaceById$Response(params: ReplaceById$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return replaceById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `replaceById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  replaceById(params: ReplaceById$Params, context?: HttpContext): Observable<void> {
    return this.replaceById$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `todoControllerDeleteById()` */
  static readonly TodoControllerDeleteByIdPath = '/todos/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById$Response(params: DeleteById$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById(params: DeleteById$Params, context?: HttpContext): Observable<void> {
    return this.deleteById$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `todoControllerUpdateById()` */
  static readonly TodoControllerUpdateByIdPath = '/todos/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateById$Response(params: UpdateById$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return updateById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateById(params: UpdateById$Params, context?: HttpContext): Observable<void> {
    return this.updateById$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `todoControllerFind()` */
  static readonly TodoControllerFindPath = '/todos';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `find()` instead.
   *
   * This method doesn't expect any request body.
   */
  find$Response(params?: Find$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TodoWithRelations>>> {
    return find(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `find$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  find(params?: Find$Params, context?: HttpContext): Observable<Array<TodoWithRelations>> {
    return this.find$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<TodoWithRelations>>): Array<TodoWithRelations> => r.body)
    );
  }

  /** Path part for operation `todoControllerCreate()` */
  static readonly TodoControllerCreatePath = '/todos';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create$Response(params?: Create$Params, context?: HttpContext): Observable<StrictHttpResponse<Todo>> {
    return create(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `create$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create(params?: Create$Params, context?: HttpContext): Observable<Todo> {
    return this.create$Response(params, context).pipe(
      map((r: StrictHttpResponse<Todo>): Todo => r.body)
    );
  }

  /** Path part for operation `todoControllerUpdateAll()` */
  static readonly TodoControllerUpdateAllPath = '/todos';

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
