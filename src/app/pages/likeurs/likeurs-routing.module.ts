import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LikeursPage } from './likeurs.page';

const routes: Routes = [
  {
    path: '',
    component: LikeursPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LikeursPageRoutingModule {}
