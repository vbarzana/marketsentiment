import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SentimentPage } from './sentiment';
import {RestProvider} from '../../providers/rest/rest';

@NgModule({
  declarations: [
    SentimentPage,
  ],
  imports: [
    IonicPageModule.forChild(SentimentPage),
  ],
  exports: [
    SentimentPage
  ],
  entryComponents: [SentimentPage],
  providers: [RestProvider]
})
export class SentimentPageModule {}
