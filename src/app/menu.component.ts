import { Component, ViewChild } from '@angular/core';
import { Nav,NavParams } from 'ionic-angular';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { ProfilePage } from "../pages/profile/profile";
import { ShareService } from "../providers/ShareService";
import { TeleHealthPage } from "../pages/tele-health/tele-health";

@Component({
  templateUrl: 'menu.html',
  providers: [ShareService]   
})
export class MenuComponent {
  @ViewChild('content') nav: Nav;

  rootPage: any = ProfilePage;
user:any;
  pages: Array<{title: string, component: any}>;

  constructor(private navParams:NavParams,private shareService: ShareService) {
    shareService.setUserName(this.navParams.get('param1'));
    alert(shareService.setUserName(this.navParams.get('param1')));
    //this.user = this.navParams.get('param1');
    this.pages = [
      { title:'HOME',component:ProfilePage},
      { title:'Tele Health',component:TeleHealthPage},
      { title: 'Page One', component: Page1 },
      { title: 'Page Two', component: Page2 }
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
