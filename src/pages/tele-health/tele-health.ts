import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TeleHealthPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tele-health',
  templateUrl: 'tele-health.html',
})
export class TeleHealthPage {
  items: any = [];
  itemExpandHeight: number = 100;
data:any;
  constructor(public navCtrl: NavController,private navParams: NavParams) {
    this.data = this.navParams.get('param1');   
  
      this.items = [
          {expanded: false},
          {expanded: false},
          {expanded: false},
          {expanded: false},
          {expanded: false},
          {expanded: false},
          {expanded: false},
          {expanded: false},
          {expanded: false}
      ];

  }

  expandItem(item){

      this.items.map((listItem) => {

          if(item == listItem){
              listItem.expanded = !listItem.expanded;
          } else {
              listItem.expanded = false;
          }

          return listItem;

      });

  }
}
