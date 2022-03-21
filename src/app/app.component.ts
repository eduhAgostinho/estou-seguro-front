import { Component, OnInit } from '@angular/core';
import { Ocorrencia } from './model/ocorrencia';
import { OcorrenciasService } from './services/ocorrencias.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  marked!: { lat: number; lng: number; };
  ocorrencias: Ocorrencia[] = [];

  constructor(private ocorrenciaService: OcorrenciasService ) {}

  ngOnInit(): void {
    this.getOcorrencias();
  }

  onSubmit(event: { descricao: string, data: string, numeroOcorrencia: string }): void {
    if (this.marked !== null && this.marked !== undefined) {
      this.ocorrenciaService.createOcorrencia({ 
        ...event,
        latitude: this.marked.lat,
        longitude: this.marked.lng
      }).subscribe(novaOcorrencia => {
        this.ocorrencias.push(novaOcorrencia);
      })
    } else {
      alert('Selecione um local no mapa')
    }
  }

  getOcorrencias() {
    this.ocorrenciaService.getOcorrencias().subscribe(response => this.ocorrencias = response);
  }
}
