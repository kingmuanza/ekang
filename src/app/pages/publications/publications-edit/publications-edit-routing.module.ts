import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicationsEditPage } from './publications-edit.page';

const routes: Routes = [
  {
    path: '',
    component: PublicationsEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicationsEditPageRoutingModule {}
