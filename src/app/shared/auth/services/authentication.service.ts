import {Injectable, NgZone} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import * as auth from 'firebase/auth';
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {IFirebaseUser} from "../model/user.model";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";


@Injectable({
    providedIn: "root"
  }
)
export class AuthenticationService {
  userData: IFirebaseUser | null = null;

  constructor(private angularFireAuth: AngularFireAuth,
              private router: Router,
              public afStore: AngularFirestore,
              private ngZone: NgZone,
              private toastController: ToastController) {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = {
          uid: user.uid,
          photoUrl: user.photoURL,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          email: user.email
        };
        localStorage.setItem('user', JSON.stringify(this.userData))
      }
    })
  }

  register(value: { email: string, password: string }) {
    return this.angularFireAuth.createUserWithEmailAndPassword(value.email, value.password)
  }

  login(value: { email: string, password: string }) {
    return this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password)
  }

  sendEmailVerificationMail() {
    return this.angularFireAuth.currentUser.then((user) => {
      return user?.sendEmailVerification().then(() => {
        if (this.router.url !== '/auth/tabs/login')
          this.router.navigateByUrl('/auth/tabs/login').then()
      })
    })
  }

  passwordRecovery(passwordResetEmail: string) {
    return this.angularFireAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.toastController.create({
          message: 'Password Recovery Mail was sent! Check your Inbox - wait up to 5 Minutes, before you resend this Mail',
          duration: 1500,
          position: 'bottom'
        }).then(toastElem => toastElem.present().then());
      })
  }

  get isLoggedIn(): boolean {
    const user: IFirebaseUser = JSON.parse(localStorage.getItem('user')!);
    return user != null && user.emailVerified;
  }

  get userId(): string {
    const user: IFirebaseUser = JSON.parse(localStorage.getItem('user')!);
    return user.uid;
  }

  get userMail(): string | null {
    const user: IFirebaseUser = JSON.parse(localStorage.getItem('user')!);
    return user.email;
  }

  get isEmailVerified(): boolean {
    const user: IFirebaseUser = JSON.parse(localStorage.getItem('user')!);
    return user.emailVerified;
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  // Auth providers
  authLogin(provider: any) {
    return this.angularFireAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/tabs/home').then();
        });
        this.setUserData(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Store user in localStorage
  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    const userData: IFirebaseUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign-out
  logOut() {
    return this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('/auth/tabs/login').then();
    });
  }
}
