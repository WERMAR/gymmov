import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IUser} from "../model/user.interface";
import firebase from "firebase/compat";
import functions = firebase.functions;
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

@Injectable(
  {
    providedIn: "root"
  }
)
export class UserService {

  constructor(private firestore: AngularFirestore, private router: Router) {

  }

  public userFirstTimeInformation(user: IUser) {
    console.log('was called')
    return fromPromise(this.firestore.collection('/users').doc(user.userId).set(user))
  }


  public loadUserForMail(mail: string, resolver: () => void) {
    this.firestore.collection('/users').get().subscribe(res => {
      res.docs.forEach(doc => {
        const data = doc.data() as IUser;
        console.log(data)
        if (data.mail === mail) {
          resolver();
        } else {
          this.router.navigateByUrl('/app/firstlogin').then();
        }
      })
    })
  }
}
