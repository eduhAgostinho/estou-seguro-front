import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapaComponent } from './ocorrencias/mapa/mapa.component';
import { OcorrenciaFormComponent } from './ocorrencias/ocorrencia-form/ocorrencia-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { OcorrenciasComponent } from './ocorrencias/ocorrencias.component';
import { FooterComponent } from './home/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    OcorrenciaFormComponent,
    HomeComponent,
    OcorrenciasComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
