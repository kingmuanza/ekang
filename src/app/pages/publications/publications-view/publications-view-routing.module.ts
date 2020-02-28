import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicationsViewPage } from './publications-view.page';

const routes: Routes = [
  {
    path: '',
    component: PublicationsViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicationsViewPageRoutingModule {}
