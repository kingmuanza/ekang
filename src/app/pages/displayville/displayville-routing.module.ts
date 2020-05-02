import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayvillePage } from './displayville.page';

const routes: Routes = [
  {
    path: '',
    component: DisplayvillePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayvillePageRoutingModule {}
