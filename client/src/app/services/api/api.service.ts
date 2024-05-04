import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'https://z-commerce-wp36.onrender.com/api/v1';

  constructor(private http: HttpClient) {}

  readData<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`);
  }

  createData<T>(endpoint: string, body: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body);
  }

  createDataWithFile(endpoint: string, body: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file, file.name);
    formData.append('product', JSON.stringify(body));
    return this.http.post(`${this.baseUrl}/${endpoint}`, formData);
  }

  updateData<T>(endpoint: string, body: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body);
  }

  deleteData<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`);
  }
}
