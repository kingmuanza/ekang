import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgrammePage } from './programme.page';

const routes: Routes = [
  {
    path: '',
    component: ProgrammePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgrammePageRoutingModule {}
