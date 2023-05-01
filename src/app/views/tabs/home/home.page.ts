import {Component} from '@angular/core';
import {AuthenticationService} from "../../../shared/auth/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  onLogOut() {
    this.authService.logOut().then(() => {
        this.router.navigateByUrl('/auth/tabs/login').then()
      }
    );
  }
}
