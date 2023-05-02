import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoadingController, ToastController} from "@ionic/angular";
import {AuthenticationService} from "../../../../shared/auth/services/authentication.service";
import {UserService} from "../../../../shared/user/services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  password: string = "";
  email: string = "";

  constructor(private router: Router,
              private loadingController: LoadingController,
              private toastController: ToastController,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit() {
  }

  onLogin() {
    this.loadingController.create({
      spinner: 'bubbles',
      message: 'Please Wait... we log you in',
    }).then(loadingElem => {
      loadingElem.present().then(() => {
        this.authenticationService.login({email: this.email, password: this.password}).then(result => {
          setTimeout(() => {
            if (this.authenticationService.isEmailVerified) {
              loadingElem.dismiss().then(() => {
                this.checkIfUserLoggedInFirstTime();
              })
            } else {
              this.toastController.create({
                color: 'warning',
                message: 'Please Confirm your Mail first',
                duration: 3000,
                position: "bottom",
                buttons: [
                  {
                    icon: 'repeat-outline',
                    text: 'Resend',
                    handler: () => {
                      this.authenticationService.sendEmailVerificationMail().then()
                    }
                  }
                ]
              }).then(toastElem => {
                loadingElem.dismiss().then(() => toastElem.present().then())
              })
            }
          }, 1000);
        }).catch(catchError => {
          console.error(catchError);
          this.toastController.create({
            color: "danger",
            message: `Technically Error: ${catchError.message}`,
            position: "bottom",
            duration: 1500
          }).then(toastElem => loadingElem.dismiss().then(() => toastElem.present().then()))
        })
      })
    })
  }

  onNoAccountClicked() {
    this.router.navigateByUrl('auth/tabs/register').then(() => console.debug("Navigate to Register Page"));
  }

  private checkIfUserLoggedInFirstTime() {
    this.userService.loadUserForMail(this.authenticationService.userMail!, () => {
      this.router.navigateByUrl('/app/tabs/home').then();
    });
  }

}
