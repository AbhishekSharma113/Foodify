/**
  
 *
 */

import { ApiResponseModel } from '@core/model/api-response.model';

import { RolesResponse } from './../../@core/model/workers.model';
import { RoleModel } from './../../@core/model/role.model';
import { Workers, WorkersResponse } from '../../@core/model/workers.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkersService {
  formData: Workers;
  form: Workers;

  readonly URL = `${this._getUrl()}`;

  constructor(private http: HttpClient) {}

  getWorkersList() {
    return this.http.get<WorkersResponse>(this.URL + 'employee');
  }

  deleteUserRole(formData: Workers) {
    return this.http.put<ApiResponseModel>(
      this.URL + 'employee/' + formData.BannerId + '/' + formData.RoleId,
      formData.BannerId
    );
  }

  addUserRole(formData: Workers) {
    return this.http.put<ApiResponseModel>(this.URL + 'employee/add', formData);
  }

  getRole() {
    return this.http.get<RolesResponse>(this.URL + 'employee/role');
  }

  getStudent() {
    return this.http.get<ApiResponseModel>(this.URL + 'employee/student');
  }

  private _getUrl() {
    return `${environment.serverUrl}`;
  }
}
