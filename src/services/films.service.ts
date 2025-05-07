import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Film } from '../entities/film';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  getFilmById(id: string): Observable<Film> {
    return this.http.get<Film>(`${this.url}films/${id}`, this.getTokenHeader()).pipe(
      catchError(error => this.usersService.processError(error))
    );
  }
  
  addFilm(film: Film): Observable<any> {
    return this.http.post(`${this.url}films`, film, this.getTokenHeader()).pipe(
      catchError(error => this.usersService.processError(error))
    );
  }
  
  updateFilm(film: Film): Observable<any> {
    return this.http.put(`${this.url}films/${film.id}`, film, this.getTokenHeader()).pipe(
      catchError(error => this.usersService.processError(error))
    );
  }
  
  url = environment.restServerUrl;
  http = inject(HttpClient);
  usersService = inject(UsersService);

  get token() {
    return this.usersService.token;
  }

  getTokenHeader(): {headers?: {[header: string]: string},
                     params?: HttpParams} | undefined {
    if (!this.token) {
      return undefined;
    }
    return {headers: {'X-Auth-Token': this.token}}
  }

  getFilms(orderBy?: string, descending?: boolean, indexFrom?: number, indexTo?: number, search?:string): Observable<FilmsResponse> {
    let options = this.getTokenHeader();
    if (orderBy || descending || indexFrom || indexTo || search) {
      options = {...(options || {}) , params: new HttpParams()};
    }
    if (options && options.params) {
      if (orderBy) options.params = options.params.set('orderBy', orderBy);
      if (descending) options.params = options.params.set('descending', descending);
      if (indexFrom) options.params = options.params.set('indexFrom', indexFrom);
      if (indexTo) options.params = options.params.set('indexTo', indexTo);
      if (search) options.params = options.params.set('search', search);
    }
    return this.http.get<FilmsResponse>(this.url + 'films', options).pipe(
      catchError(error => this.usersService.processError(error))
    )
  }
}

export interface FilmsResponse {
  items: Film[],
  totalCount: number
}