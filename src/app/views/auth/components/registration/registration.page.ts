import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../shared/auth/services/authentication.service";
import {catchError} from "rxjs";
import {LoadingController, ToastController} from "@ionic/angular";

@Component({
  selector: 'app-registration1',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private toastController: ToastController,
              private loadingController: LoadingController) {
  }

  ngOnInit() {
  }

  onSignUp() {
    this.loadingController.create({
      message: 'Register... Wait for a Moment',
      spinner: 'bubbles'
    }).then(loadingElem => {
      loadingElem.present().then(() => {
        this.authenticationService.register({email: this.email, password: this.password}).then(result => {
          this.authenticationService.sendEmailVerificationMail().then(() => {
            this.toastController.create({
              message: 'You registered successfully - Confirm your E-Mail Address and begin the journey',
              duration: 1500,
              position: 'bottom',
              color: 'success'
            }).then(toastElem => {
              loadingElem.dismiss().then(() => {
                toastElem.present().then(() => {
                  this.router.navigateByUrl('/auth/tabs/login').then();
                });
              })
            })
          })
        }).catch(catchError => {
          console.error(catchError)
          loadingElem.dismiss().then(() => {
            this.toastController.create({
              color: 'danger',
              position: 'bottom',
              duration: 1500,
              message: `Technically Error: ${catchError.message}`
            }).then(toastElem => toastElem.present().then())
          })
        });
      })
    })
  }

  onLogInClicked() {
    this.router.navigateByUrl('auth/tabs/login').then(() => console.debug('Redirect to Login Page'))
  }
}
