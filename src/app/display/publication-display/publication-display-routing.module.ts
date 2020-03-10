import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicationDisplayPage } from './publication-display.page';

const routes: Routes = [
  {
    path: '',
    component: PublicationDisplayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicationDisplayPageRoutingModule {}
