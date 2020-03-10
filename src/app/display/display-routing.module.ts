import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayPage } from './display.page';

const routes: Routes = [
  {
    path: '',
    component: DisplayPage
  },
  {
    path: 'publication-display',
    loadChildren: () => import('./publication-display/publication-display.module').then( m => m.PublicationDisplayPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayPageRoutingModule {}
