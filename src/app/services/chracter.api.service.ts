import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RESPONSE_RESULT } from '../model/character';
import { environment } from 'src/environments/environment';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root',
})
export class CharacterApiService {
  constructor(private http: HttpClient) {}

  private defaultParams(): HttpParams {
    const { marvelKeys } = environment;
    const { publicKey, privateKey } = marvelKeys;

    let params = new HttpParams();
    const ts = new Date().getTime();
    const hash = Md5.hashStr(`${ts}${privateKey}${publicKey}`);
    params = params.append('ts', ts);
    params = params.append('apikey', publicKey);
    params = params.append('hash', hash);

    return params;
  }

  getCharacters(
    nameStartsWith: string,
    offset: number = 0,
    limit: number = 10
  ): Observable<RESPONSE_RESULT> {
    const apiUrl = `${environment.apiUrl}characters`;
    let params = this.defaultParams();
    params = params.append('nameStartsWith', nameStartsWith ?? '');
    params = params.append('limit', limit);
    params = params.append('offset', offset);

    return this.http.get<RESPONSE_RESULT>(apiUrl, { params });
  }

  getCharacter(id: number): Observable<RESPONSE_RESULT> {
    const apiUrl = `${environment.apiUrl}character/${id}`;

    return this.http.get<RESPONSE_RESULT>(apiUrl, {
      params: this.defaultParams(),
    });
  }
}
