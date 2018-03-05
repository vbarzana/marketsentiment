import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

@IonicPage({
  name: 'team'
})
@Component({
  selector: 'page-team',
  templateUrl: 'team.html'
})
export class TeamPage {
  selectedItem: any;
  items: Array<{title: string, url: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.items = [{
      title: 'Jesse',
      icon: 'https://user.profit.ly/profileimages/93281/ac/a4ca20aef911e79d76cf6b72c2e00f.gif',
      url: 'https://profit.ly/user/TimeFliesBuy'
    },{
      title: 'Angel',
      icon: 'https://user.profit.ly/profileimages/54253/50/888b80f8e311e7a7cfb71e8d19c285.jpg',
      url: 'https://profit.ly/user/AngelTrades'
    },{
      title: 'Alan',
      icon: 'https://user.profit.ly/profileimages/86970/61/a66860bfaa11e68b8ad73923431efb.jpg',
      url: 'https://profit.ly/user/alan316'
    },{
      title: 'Van',
      icon: 'https://user.profit.ly/profileimages/97782/cd/bda7305cd411e7add4cf8f045012f4.gif',
      url: 'https://profit.ly/user/VanBonzel'
    }, {
      title: 'Victor',
      icon: 'https://user.profit.ly/profileimages/114092/22/b83a70628911e787f36f7ac980c502.jpg',
      url: 'https://profit.ly/user/hacktheticker'
    }];
  }
}
