import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalePage } from './principale.page';

const routes: Routes = [
  {
    path: '',
    component: PrincipalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalePageRoutingModule {}
