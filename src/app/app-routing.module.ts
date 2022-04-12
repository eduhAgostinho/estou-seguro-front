import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OcorrenciasComponent } from './ocorrencias/ocorrencias.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mapa', component: OcorrenciasComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
