/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteUserById } from '../fn/user-controller/delete-user-by-id';
import { DeleteUserById$Params } from '../fn/user-controller/delete-user-by-id';
import { findAllUsers } from '../fn/user-controller/find-all-users';
import { FindAllUsers$Params } from '../fn/user-controller/find-all-users';
import { findUserById } from '../fn/user-controller/find-user-by-id';
import { FindUserById$Params } from '../fn/user-controller/find-user-by-id';
import { login } from '../fn/user-controller/login';
import { Login$Params } from '../fn/user-controller/login';
import { replaceUserById } from '../fn/user-controller/replace-user-by-id';
import { ReplaceUserById$Params } from '../fn/user-controller/replace-user-by-id';
import { signUp } from '../fn/user-controller/sign-up';
import { SignUp$Params } from '../fn/user-controller/sign-up';
import { updateUserById } from '../fn/user-controller/update-user-by-id';
import { UpdateUserById$Params } from '../fn/user-controller/update-user-by-id';
import { User } from '../models/user';
import { UserWithRelations } from '../models/user-with-relations';
import { whoAmI } from '../fn/user-controller/who-am-i';
import { WhoAmI$Params } from '../fn/user-controller/who-am-i';

@Injectable({ providedIn: 'root' })
export class UserControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `userControllerSignUp()` */
  static readonly UserControllerSignUpPath = '/signup';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `signUp()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  signUp$Response(params?: SignUp$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return signUp(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `signUp$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  signUp(params?: SignUp$Params, context?: HttpContext): Observable<User> {
    return this.signUp$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `userControllerLogin()` */
  static readonly UserControllerLoginPath = '/users/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: Login$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'token'?: string;
}>> {
    return login(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: Login$Params, context?: HttpContext): Observable<{
'token'?: string;
}> {
    return this.login$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'token'?: string;
}>): {
'token'?: string;
} => r.body)
    );
  }

  /** Path part for operation `userControllerFindUserById()` */
  static readonly UserControllerFindUserByIdPath = '/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUserById$Response(params: FindUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<UserWithRelations>> {
    return findUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUserById(params: FindUserById$Params, context?: HttpContext): Observable<UserWithRelations> {
    return this.findUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserWithRelations>): UserWithRelations => r.body)
    );
  }

  /** Path part for operation `userControllerReplaceUserById()` */
  static readonly UserControllerReplaceUserByIdPath = '/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `replaceUserById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  replaceUserById$Response(params: ReplaceUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return replaceUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `replaceUserById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  replaceUserById(params: ReplaceUserById$Params, context?: HttpContext): Observable<void> {
    return this.replaceUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `userControllerDeleteUserById()` */
  static readonly UserControllerDeleteUserByIdPath = '/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUserById$Response(params: DeleteUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUserById(params: DeleteUserById$Params, context?: HttpContext): Observable<void> {
    return this.deleteUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `userControllerUpdateUserById()` */
  static readonly UserControllerUpdateUserByIdPath = '/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUserById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserById$Response(params: UpdateUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return updateUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUserById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserById(params: UpdateUserById$Params, context?: HttpContext): Observable<void> {
    return this.updateUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `userControllerFindAllUsers()` */
  static readonly UserControllerFindAllUsersPath = '/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllUsers$Response(params?: FindAllUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserWithRelations>>> {
    return findAllUsers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllUsers(params?: FindAllUsers$Params, context?: HttpContext): Observable<Array<UserWithRelations>> {
    return this.findAllUsers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserWithRelations>>): Array<UserWithRelations> => r.body)
    );
  }

  /** Path part for operation `userControllerWhoAmI()` */
  static readonly UserControllerWhoAmIPath = '/whoAmI';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `whoAmI()` instead.
   *
   * This method doesn't expect any request body.
   */
  whoAmI$Response(params?: WhoAmI$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return whoAmI(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `whoAmI$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  whoAmI(params?: WhoAmI$Params, context?: HttpContext): Observable<string> {
    return this.whoAmI$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
