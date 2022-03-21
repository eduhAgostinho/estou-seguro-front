import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ocorrencia } from '../model/ocorrencia';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
import { DATETIME_LOCAL } from '../constants/date.constant';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciasService {

  private readonly path = 'ocorrencias'

  constructor(private http: HttpClient) { }

  getOcorrencias(): Observable<Ocorrencia[]> {
    return this.http.get<Ocorrencia[]>(`${environment.baseURL}/${this.path}`);
  }

  createOcorrencia(ocorrencia: Ocorrencia): Observable<Ocorrencia> {
    const dto = { 
      ...ocorrencia,
      data: moment(ocorrencia.data, DATETIME_LOCAL).unix().toString(),
      tipoOcorrencia: 'ROUBO'
    };
    return this.http.post<Ocorrencia>(`${environment.baseURL}/${this.path}`, dto);
  }
}
