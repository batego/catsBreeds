import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IcatResponse } from '../../pages/home/home.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatBreedsService {

  constructor(private http: HttpClient) { }
  headers = new HttpHeaders().set('x-api-key', environment.key);

  getCatBreeds(page: number = 1, limit: number = 10, hasBreeds: number = 1): Observable<IcatResponse[]> {
    return this.http.get<IcatResponse[]>(`${environment.apiCat}/search?limit=${limit}&page=${page}&has_breeds=${hasBreeds}`, {headers: this.headers});
  }

  getDropdownsBreeds(limit: number = 100, hasBreeds: number = 1): Observable<IcatResponse[]> {
    return this.http.get<IcatResponse[]>(`${environment.apiCat}/search?limit=${limit}&has_breeds=${hasBreeds}`, {headers: this.headers});
  }

  getCatBreedById(page: number = 1, limit: number = 10, hasBreeds: number = 1, breed_ids: string): Observable<IcatResponse[]> {
    return this.http.get<IcatResponse[]>(`${environment.apiCat}/search?limit=${limit}&page=${page}&has_breeds=${hasBreeds}&breed_ids=${breed_ids}`, {headers: this.headers});
  }

}
