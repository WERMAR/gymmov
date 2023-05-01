import {Component, OnInit} from '@angular/core';
import {RequestedCheckIn} from "../models/requested-check-in.model";
import {ActionSheetController} from "@ionic/angular";
import {ButtonActions} from "../../../../shared/util/enums/button-actions.enum";
import {logIn} from "ionicons/icons";
import {ArrayFunctions} from "../../../../shared/util/functions/array.functions";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../shared/auth/services/authentication.service";

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
})
export class CheckInPage implements OnInit {

  requestedCheckIns: RequestedCheckIn[] = [];

  actionSheetButtons = [
    {
      text: 'Reject',
      role: 'destructive',
      data: {
        action: ButtonActions.REJECT
      }
    },
    {
      text: 'Confirm',
      data: {
        action: ButtonActions.CONFIRM
      }
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: ButtonActions.CANCEL
      }
    }
  ];

  constructor(private actionSheetController: ActionSheetController, private router: Router, private authService: AuthenticationService) {
  }

  ngOnInit() {

  }

  onClosedActionSheet(resultOfActionPane: any, checkInRequest: RequestedCheckIn) {
    console.log(resultOfActionPane)
    if (resultOfActionPane.role !== 'backdrop') {
      const action = resultOfActionPane.data?.action;
      switch (action) {
        case ButtonActions.REJECT:
          this.rejectAction(checkInRequest);
          break;
        case ButtonActions.CONFIRM:
          this.confirmAction();
          break;
        default:

      }
    }
  }

  private rejectAction(rejectedElement: RequestedCheckIn) {
    console.log('Reject');
    ArrayFunctions.removeFromArrayForElement(rejectedElement, this.requestedCheckIns)
    // TODO: trigger request to reject the check-in-request

  }

  private confirmAction() {
    console.log('Confirm')
    // TODO trigger regquest to confirm the check-in-request
  }

  openActionDialogForItem(checkInRequest: RequestedCheckIn) {
    this.actionSheetController.create(
      {
        header: 'Check-In Options',
        buttons: this.actionSheetButtons
      }
    ).then(elem => elem.present().then(() => {
        elem.onDidDismiss().then(r => this.onClosedActionSheet(r, checkInRequest))
      })
    )
  }

  onLogOut() {
    this.authService.logOut().then(() => {
        this.router.navigateByUrl('/auth/tabs/login').then()
      }
    );
  }
}
