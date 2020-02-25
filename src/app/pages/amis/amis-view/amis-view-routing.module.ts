import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmisViewPage } from './amis-view.page';

const routes: Routes = [
  {
    path: '',
    component: AmisViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmisViewPageRoutingModule {}
