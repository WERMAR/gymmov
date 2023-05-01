import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../shared/auth/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  onLogOut() {
    this.authService.logOut().then(() => {
        this.router.navigateByUrl('/auth/tabs/login').then()
      }
    );
  }

}
