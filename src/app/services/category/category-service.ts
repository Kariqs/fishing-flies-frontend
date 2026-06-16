import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import {
  Category,
  CreateCategoryRequest,
  CreateCategoryResponse,
  GetCategoriesResponse,
} from '../../models/category.model';
import { ErrorHandlerService } from '../../utils/error.handler.util';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = environment.apiUrl;

  http = inject(HttpClient);
  errorHandler = inject(ErrorHandlerService);

  createCategory(categoryData: CreateCategoryRequest): Observable<CreateCategoryResponse> {
    return this.http
      .post<CreateCategoryResponse>(`${this.apiUrl}/categories`, categoryData)
      .pipe(catchError((error) => this.errorHandler.handleError(error)));
  }

  getCategories(): Observable<GetCategoriesResponse> {
    return this.http
      .get<GetCategoriesResponse>(`${this.apiUrl}/categories`)
      .pipe(catchError((error) => this.errorHandler.handleError(error)));
  }
}
