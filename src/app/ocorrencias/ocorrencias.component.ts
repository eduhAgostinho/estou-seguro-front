import { Component, OnInit } from '@angular/core';
import { Ocorrencia } from '../model/ocorrencia';
import { OcorrenciasService } from '../services/ocorrencias.service';

@Component({
  selector: 'app-ocorrencias',
  template: `
    <app-ocorrencia-form (submitEvent)="onSubmit($event)"></app-ocorrencia-form>
    <app-mapa [inputOcorrencias]="ocorrencias" (onMarked)="marked = $event"></app-mapa>
  ` 
})
export class OcorrenciasComponent implements OnInit {

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
