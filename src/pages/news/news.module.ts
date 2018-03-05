import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsPage } from './news';
import {RestProvider} from '../../providers/rest/rest';

@NgModule({
  declarations: [
    NewsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsPage),
  ],
  exports: [
    NewsPage
  ],
  entryComponents: [NewsPage],
  providers: [RestProvider]
})
export class NewsPageModule {}
