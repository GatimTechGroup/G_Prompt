import { IonicPage, NavController,LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RequestOptions,Headers } from "@angular/http";
import { Api } from "../../providers/providers";
import { ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html'
})
export class ForgotPage {
  public resetPasswordForm;
  public backgroundImage: any = "./assets/bg3.jpg"; 

  constructor( public api:Api,public fb: FormBuilder, public nav: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController,public toast:ToastController) {

      let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.resetPasswordForm = fb.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      });
  }

  resetPassword(value){
    alert(value.email);

    let resetcredentials =value.email; 
    //   if(value.email==""){
    //     let toast = this.toast.create({
    //       message: 'Please Enter Email ID',
    //       duration: 3000,
    //       position: 'bottom'
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




    if (!this.resetPasswordForm.valid||value.email==""){
      this.presentAlert('enter valid email')
        console.log("enter valid email = "+ this.resetPasswordForm.value);
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
  }

  presentAlert(title) {
    let alert = this.alertCtrl.create({
      title: title,
      buttons: ['OK']
    });
    alert.present();
  }
}
