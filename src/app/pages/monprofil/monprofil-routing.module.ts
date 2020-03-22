import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonprofilPage } from './monprofil.page';

const routes: Routes = [
  {
    path: '',
    component: MonprofilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonprofilPageRoutingModule {}
