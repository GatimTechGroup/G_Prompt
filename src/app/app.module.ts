import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

import { LoginModule } from "./login/login.module";
import { MenuComponent } from "./menu.component";
import { BrowserModule } from '@angular/platform-browser';
import { Settings,Api } from "../providers/providers";
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { ProfilePage } from "../pages/profile/profile";
import { ForgotPage } from "../pages/forgot/forgot";
import { ShareService } from "../providers/ShareService";
import { TeleHealthPage } from "../pages/tele-health/tele-health";
import { ExpandableComponent } from "../components/expandable/expandable";

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    MenuComponent,
    ProfilePage,
    ForgotPage,
    TeleHealthPage,
    ExpandableComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    LoginModule,
    BrowserModule,HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    MenuComponent,
    ProfilePage,
    ForgotPage,
    TeleHealthPage,
    ExpandableComponent
  ],
  providers: [ 
    StatusBar,
    SplashScreen,
    ShareService,
    Api,
    { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule {}
