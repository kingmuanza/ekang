import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicationsPage } from './publications.page';

const routes: Routes = [
  {
    path: '',
    component: PublicationsPage
  },
  {
    path: 'publications-view',
    loadChildren: () => import('./publications-view/publications-view.module').then( m => m.PublicationsViewPageModule)
  },
  {
    path: 'publications-edit',
    loadChildren: () => import('./publications-edit/publications-edit.module').then( m => m.PublicationsEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicationsPageRoutingModule {}
