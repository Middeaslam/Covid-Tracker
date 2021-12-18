import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  { path: 'states', loadChildren: () => import('./screens/states/states.module').then(m => m.StatesModule) },
  { path: 'vaccine', loadChildren: () => import('./screens/vaccine/vaccine.module').then(m => m.VaccineModule) },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
