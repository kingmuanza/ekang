import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TrainingPageRoutingModule } from "./training-routing.module";

import { TrainingPage } from "./training.page";
import { DisplayPageModule } from "src/app/display/display.module";
import { ShareModule } from "src/app/share.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainingPageRoutingModule,
    DisplayPageModule,
    ShareModule,
  ],
  declarations: [TrainingPage],
})
export class TrainingPageModule {}
