// fly.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ErrorHandlerService } from '../../utils/error.handler.util';
import { CreateFlyResponse, GetFliesResponse } from '../../models/fly.model';

@Injectable({
  providedIn: 'root',
})
export class FlyService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private errorHandler = inject(ErrorHandlerService);

  createFly(formData: FormData): Observable<CreateFlyResponse> {
    return this.http
      .post<CreateFlyResponse>(`${this.apiUrl}/fly`, formData)
      .pipe(catchError((err) => this.errorHandler.handleError(err)));
  }

  getFlies(): Observable<GetFliesResponse> {
    return this.http
      .get<GetFliesResponse>(`${this.apiUrl}/fly`)
      .pipe(catchError((err) => this.errorHandler.handleError(err)));
  }

  updateFly(id: number, formData: FormData): Observable<CreateFlyResponse> {
    return this.http
      .put<CreateFlyResponse>(`${this.apiUrl}/fly/${id}`, formData)
      .pipe(catchError((err) => this.errorHandler.handleError(err)));
  }

  deleteFly(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/fly/${id}`)
      .pipe(catchError((err) => this.errorHandler.handleError(err)));
  }
}
