import { Component,ViewChild } from '@angular/core';
import { IonicPage,Nav, NavController,LoadingController, NavParams,ModalController,MenuController } from 'ionic-angular';

import {TeleHealthPage} from '../tele-health/tele-health';
import { Storage } from '@ionic/storage';
import { ShareService } from "../../providers/ShareService";
import { LoginComponent } from "../../app/login/login.component";
import { Api } from "../../providers/providers";
import { RequestOptions,Headers } from "@angular/http";

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  token: string;
  id: string;

  rootPage: string = 'ProfilePage';
  following = false;
user :any;
background={
  coverImage:'./assets/img/background/card-amsterdam.png'
}
 

  responseData :any;
  Id :any;
  constructor(public loadingCtrl:LoadingController,public api:Api,public service:ShareService,public storage:Storage, private navParams: NavParams,public navCtrl: NavController, public modalCtrl: ModalController,public menu:MenuController) {
   
    this.user =  service.getUserName();  
    localStorage.setItem('Login_userid',this.user.Id);
  // this.storage.set('Login_userid',this.user.Id);
   
  //  this.storage.get('Login_userid').then((val) => {
  //   console.log('Your name is', val);
  //   this.Id = val;
  // });
  
   }
   ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
  ionViewDidLoad() {
    console.log('Hello Profile Four Page');
   
  }
  logout(){
    this.navCtrl.push(LoginComponent);
  }
  getTeleHealthdata(){
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', 
      content: ''
    });
    loadingPopup.present();
    this.id=localStorage.getItem('Login_userid');
    this.token = localStorage.getItem('token');
    let options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append('Authorization', 'Bearer ' + this.token);
  //var body='username='+credentials;
    this.api.post('PatientUser/PatientPortalTeleHealthGridView?PatientId='+this.id,null,options).
    subscribe(res =>{
console.log(res.json())
console.log(res.json().TeleHealthAppoinmentHistoryList)
loadingPopup.dismiss();
this.navCtrl.push(TeleHealthPage,{
  param1:res.json().TeleHealthAppoinmentHistoryList 
});
    },(err) =>{
      console.log(err)
      loadingPopup.dismiss();
    });
  //   this.authService.TeleHealthdata(this.Id).then((result)=>{
  //     this.responseData = result;
  //     console.log(this.responseData);
  //     console.log(this.responseData.TeleHealthAppoinmentHistoryList);
  //     debugger;
  //    this.navCtrl.push(TeleHealthPage,{
  //     param1:this.responseData.TeleHealthAppoinmentHistoryList 
  // });
  //      },(err)=>{
  //       console.log(err)
  //     });
 }
  presentProfileModal() {
 // let profileModal = this.modalCtrl.create(ChatPage, { userId: 8675309 });
   // profileModal.present();
  // this.navCtrl.push(HomePage);
   //this.nav.setRoot(ChatPage).catch(err => console.error(err));
  }



}
