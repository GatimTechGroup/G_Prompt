import { Component } from '@angular/core';
import { LoginService } from "./login.service";
import { Storage } from '@ionic/storage';

import { IonicPage, NavController, NavParams,AlertController,LoadingController,MenuController } from 'ionic-angular';

import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

import { FormBuilder, Validators } from '@angular/forms';

import { ToastController } from 'ionic-angular';
import { MenuComponent } from "../menu.component";
import { Api } from "../../providers/providers";
import { RequestOptions, Headers } from "@angular/http";
import { ForgotPage } from "../../pages/forgot/forgot";

@Component({
   selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginComponent {

  // constructor(private loginService: LoginService, private nav: NavController) {}

  // login(username) {
  //   this.loginService.login(username);
  //   this.nav.pop();
  // }

  public backgroundImage: any = "./assets/bg1.jpg";
  responseData :any;
  public loginForm: any;
  captchaval :String='';
  token: any;
  user :any;
  dataV : any;
 
 
  constructor(private storage:Storage, public api:Api,public navCtrl: NavController,  public fb: FormBuilder, public alertCtrl: AlertController, public loadingCtrl: LoadingController,public toast:ToastController,public menu :MenuController) {
              let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
              this.loginForm = fb.group({
                    email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
                    password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
              });
              this.dataV={email:"",password:""};
              
          }

          // ionViewDidEnter() {
          //   // the root left menu should be disabled on the tutorial page
          //   this.menu.enable(false);
          // }
        
          
  login(values){
   
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', 
      content: ''
    });
    if (!this.loginForm.valid){
      this.presentAlert('Username password can not be blank')
      console.log("error");
  } else {
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', 
      content: ''
    });
    loadingPopup.present();
    let loginParameters = {
      'grant_type': 'password',
      'username': values.email,
      'password': values.password
  }
    var body = 'username=' + loginParameters.username + '&password=' + loginParameters.password + '&grant_type=password'
    let options = new RequestOptions();
    options.headers = new Headers();
    this.api.post("Token",body,options).subscribe(res => {
      this.responseData = res.json();
      console.log(res.json());
      loadingPopup.dismiss();
     // alert(res.json().access_token);
      //this.storage.set('token',res.json().access_token);
      localStorage.setItem('token',res.json().access_token)
      // this.storage.get('token').then((val) => {
      //   console.log('Your token is:----', val);
      //   this.token = val;
      //   debugger;
      // });
     
      this.getProfile();
    }, (err) => {
    
    console.log("Error occured:"+err);
  
      var errorMessage: string = err.json().error_description;
      loadingPopup.dismiss().then( () => {
        this.presentAlert(errorMessage)
    });
    });
  }
  }

    getProfile(){
      let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent', 
        content: ''
      });
      loadingPopup.present();
      this.token = localStorage.getItem('token');
     // alert(this.token);
    let options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append('Authorization', 'Bearer ' + this.token);
    this.api.get('PatientUser/Index','',options)
   .subscribe(res => {
     // alert('got');
      console.log(res.json());
      loadingPopup.dismiss();
      this.user = res.json();

      this.navCtrl.push(MenuComponent,{
            param1:this.user  
        });
  
    }, (err) => {
    
    console.log("Error occured:"+err);
    var errorMessage: string = err.json().error_description;
    loadingPopup.dismiss().then( () => {
      this.presentAlert(errorMessage)
  });
  
    });
    }


    forgot(value){
      console.log(value.email);
      let resetcredentials =value.email; 
      if (value.email==""){
        this.presentAlert('enter valid email')
          console.log("enter valid email = "+ this.loginForm.value);
      } else {
  
        let loadingPopup = this.loadingCtrl.create({
          spinner: 'crescent', 
          content: ''
        });
        loadingPopup.present();
  
        let options = new RequestOptions();
        options.headers = new Headers();
  
     this.api.post('UserManager/ForgotPassword?EmailId='+resetcredentials,null,options).
    subscribe(res =>{
     console.log(res);
     loadingPopup.dismiss();
               },(err) =>{
                console.log(err);
                 if(err.status===503){
                  loadingPopup.dismiss();
                   //this.toastr.error('Please contact support if you are unable to remember password.','Oops!');
                   let toast = this.toast.create({
                     message: 'Please contact support team.',
                     duration: 3000,
                     position: 'bottom'
                   });
                   toast.onDidDismiss(() => {
                     console.log('Dismissed toast');
                   });
                 
                   toast.present();
               
                  // var errorMessage: string = err;
                  // this.presentAlert(errorMessage);
                 }
                
               });
       
      }
      //this.navCtrl.push(ForgotPage);


    //   let resetcredentials =values.email; 
    //   if(values.email==""){
    //     let toast = this.toast.create({
    //       message: 'Please Enter Email ID',
    //       duration: 3000,
    //       position: 'middle'
    //     });
    //     toast.onDidDismiss(() => {
    //       console.log('Dismissed toast');
    //     });
      
    //     toast.present();
    //   }else{
    //     let options = new RequestOptions();
    //     options.headers = new Headers();
    //     debugger;
    //  this.api.post('UserManager/ForgotPassword?EmailId='+resetcredentials,null,options).
    // subscribe(res =>{
    //  console.log(res);
    //                  /// this.toastr.success('Please contact support if you are unable to remember password.','Success!');
    //            },(err) =>{
    //             console.log(err);
    //              if(err.status===503){
    //                //this.toastr.error('Please contact support if you are unable to remember password.','Oops!');
    //                let toast = this.toast.create({
    //                  message: 'Please contact support team.',
    //                  duration: 3000,
    //                  position: 'middle'
    //                });
    //                toast.onDidDismiss(() => {
    //                  console.log('Dismissed toast');
    //                });
                 
    //                toast.present();
    //              }
                
    //            });
            
    //         }
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  createAccount(){
    this.navCtrl.push('RegisterPage');
  }
  // resolved(captchaResponse: string) {
  //   console.log(`Resolved captcha with response ${captchaResponse}:`);
  //   alert(grecaptcha.getResponse());
  //   this.captchaval = grecaptcha.getResponse();
  //   this.authService.getcaptcha(this.captchaval).then((result)=>{
  //     this.responseData = result
  //    console.log(this.responseData.success);
  //    //alert(this.responseData.success);
  //    let toast = this.toast.create({
  //     message: this.responseData.success,
  //     duration: 3000,
  //     position: 'middle'
  //   });
  //   toast.onDidDismiss(() => {
  //     console.log('Dismissed toast');
  //   });
  
  //   toast.present();
  //  debugger;
  //  },(err)=>{
  //   console.log(err)
  //   });
  
  // }

  presentAlert(title) {
    let alert = this.alertCtrl.create({
      title: title,
      buttons: ['OK']
    });
    alert.present();
  }
}
