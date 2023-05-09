import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {user} from "@angular/fire/auth";
import {LoadingController, ToastController} from "@ionic/angular";
import {IUser} from "../../shared/user/model/user.interface";
import {AuthenticationService} from "../../shared/auth/services/authentication.service";
import {UserFacade} from "../../shared/user/store/user.facade";
import {Router} from "@angular/router";
import {Subject, takeUntil, tap} from "rxjs";
import {AbstractViewClass} from "../../shared/util/abstract-view.class";

const getNumbersForWeight = () => {
  const list = [];
  for (let i = 20; i <= 200; i++) {
    list.push({text: i, value: i});
  }
  return list;
}

const getNumbersForHeight = () => {
  const list = [];
  for (let i = 140; i <= 230; i++) {
    list.push({text: i, value: i});
  }
  return list;
}

@Component({
  selector: 'app-firstlogin',
  templateUrl: './firstlogin.page.html',
  styleUrls: ['./firstlogin.page.scss'],
})
export class FirstloginPage extends AbstractViewClass implements OnInit {

  pickerWeightColumns = [{
    name: 'Weight',
    options: getNumbersForWeight()
  }];

  pickerHeightColumns = [{
    name: 'Height',
    options: getNumbersForHeight()
  }];

  pickerButtons = [
    {
      text: 'Cancel',
      role: 'cancel'
    },
    {
      text: 'Confirm'
    }
  ];

  userInformationForm: FormGroup;

  constructor(private loadingController: LoadingController,
              private toastController: ToastController,
              private authService: AuthenticationService,
              private userFacade: UserFacade,
              private router: Router) {
    super();
    this.userInformationForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required, Validators.min(20), Validators.max(200)]),
      height: new FormControl('', [Validators.required, Validators.min(140), Validators.max(230)])
    })
  }

  ngOnInit() {
    this.userFacade.error$.pipe().subscribe(error => {
      if (error !== undefined) {
        this.toastController.create({
          message: `Error occurred: ${error.message}`
        }).then(toastElem => {
            toastElem.present().then()
          }
        )
      }
    })
  }

  onDidMissPicker($event: any, varConstant: string) {
    if (varConstant === 'weight') {
      this.userInformationForm.controls['weight'].setValue($event.detail.data.Weight.value);
    } else {
      this.userInformationForm.controls['height'].setValue($event.detail.data.Height.value);
    }
  }

  onClick() {
    if (this.userInformationForm.valid) {
      const user: IUser = {
        userId: this.authService.userId,
        mail: this.authService.userMail!,
        firstName: this.userInformationForm.controls['firstname'].value,
        name: this.userInformationForm.controls['lastname'].value,
        weight: this.userInformationForm.controls['weight'].value,
        height: this.userInformationForm.controls['height'].value
      }
      // Send Data to Firebase
      this.loadingController.create({
        spinner: "bubbles",
        message: "We start in 3 ...2 ... 1"
      }).then(loadingEl => {
        loadingEl.present().then(() => {
          // Use the Store here
          this.userFacade.saveFirstTimeInformation(user);
          setTimeout(() => {
            loadingEl.dismiss().then(() => this.router.navigateByUrl('/app/tabs/home').then())
          }, 1000); // TODO not best option
        })
      })

    }
  }
}
