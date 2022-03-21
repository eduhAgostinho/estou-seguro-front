import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Ocorrencia } from '../model/ocorrencia';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { formatarData } from 'src/utils/formatarData';
import { POA_COORDS } from '../constants/poaCoords.constant';
import { LETRAS } from '../constants/alfabeto.constant';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {
  @ViewChild('map', { static: false }) map!: ElementRef;
  @Output() onMarked = new EventEmitter<{ lat: number, lng: number }>();

  ocorrencias: Ocorrencia[] = [];
  ocorrenciasDisplayed: Ocorrencia[] = [];

  markers: MarkerClusterer | undefined;

  pinLabels = LETRAS;

  googleMap: google.maps.Map | undefined;
  infoWindow: google.maps.InfoWindow | undefined;

  constructor() { }

  @Input() set inputOcorrencias(ocr: Ocorrencia[]) {
    this.ocorrencias = ocr;
    this.ocorrenciasDisplayed = ocr;

    this.buildMarkers();
  };

  ngAfterViewInit(): void {
    this.initMap();
  }

  onClickMap = (event: any) => {
    if (event) {
      const lat = event.latLng.lat()
      const long = event.latLng.lng()
      this.addMarker(lat, long);
    }
  }

  addMarker(lat: number, lng: number) {
    this.ocorrenciasDisplayed = [ ...this.ocorrencias ];
    
    if (this.markers) {
      this.markers.clearMarkers();

      this.getMarkers().forEach(marker => this.markers?.addMarker(marker));

      this.markers.addMarker(new google.maps.Marker({
        position: { lat, lng },
        cursor: 'pointer',
        clickable: false
      }));

      this.onMarked.emit({ lat, lng })
    }
  }

  initMap() {
    this.googleMap = new google.maps.Map(this.map.nativeElement, {
      zoom: 14,
      center: { lat: POA_COORDS.lat, lng: POA_COORDS.lng },
      mapId: 'idMap',
      clickableIcons: false
    });
    
    this.googleMap.addListener("click", this.onClickMap)

    this.infoWindow = new google.maps.InfoWindow({ disableAutoPan: false });
    
    const markers = this.getMarkers();
  
    this.markers = new MarkerClusterer({ markers, map: this.googleMap });
  }

  getMarkers() {
    return this.ocorrenciasDisplayed.map((position, i) => {
      const label = this.pinLabels[i % this.pinLabels.length];
      const marker = new google.maps.Marker({
        position: { lat: position.latitude, lng: position.longitude },
        label,
        cursor: 'pointer'
      });

      marker.addListener("click", () => this.openInfo(position, marker));

      return marker;
    });
  }

  openInfo(ocorrencia: Ocorrencia, marker: google.maps.Marker) {
    if (this.infoWindow) {
      this.infoWindow.setContent(`
      ${ocorrencia.descricao} | ${formatarData(ocorrencia.data)}
      ${ocorrencia.numeroOcorrencia ? ` | número BO: ${ocorrencia.numeroOcorrencia}` : '' }
      `);
      this.infoWindow.open(this.googleMap, marker);
    }
  }

  buildMarkers() {
    if (this.markers) {
      this.markers.clearMarkers();
  
      this.getMarkers().forEach(marker => this.markers?.addMarker(marker));
    }
  }

}
