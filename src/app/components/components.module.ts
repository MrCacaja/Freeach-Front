import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SideButtonComponent} from "./side-button/side-button.component";
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [SideButtonComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [SideButtonComponent]
})
export class ComponentsModule { }
