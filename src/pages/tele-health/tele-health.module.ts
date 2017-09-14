import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeleHealthPage } from './tele-health';

@NgModule({
  declarations: [
    TeleHealthPage,
  ],
  imports: [
    IonicPageModule.forChild(TeleHealthPage),
  ],
})
export class TeleHealthPageModule {}
