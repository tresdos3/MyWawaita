import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserR } from '../interface/user-r';
import { Login } from '../interface/login';
import { User } from '../interface/user';
import { Recuperar } from '../interface/recuperar';

@Injectable()
export class AuthService {

  user: Observable<User>;
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) {
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.db.doc<User>('users/' + user.uid).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }
  SignIn(userLogin: Login): Observable<any> {
    return Observable.fromPromise(
      this.afAuth.auth.signInWithEmailAndPassword(userLogin.email, userLogin.password)
        .then(user => {
          if (user.emailVerified) {
            return true;
          } else {
            const asd = [{
              code: 'EmailError',
              enviar: true
            }];
            this.SignOut();
            return asd;
          }
        }).catch(error => {
          return error;
        })
    );
  }
  SignUp($data: UserR) {
    // this.afAuth.auth.createUserWithEmailAndPassword($data.email, $data.password)
    //   .then(res => { console.log(res); });
  }
  SignOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
  ConfirmationEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        user.sendEmailVerification();
      })
      .catch(error => {
        console.log(error);
      });
  }
  RecoverPassword(datos: Recuperar) {
    return this.afAuth.auth.sendPasswordResetEmail(datos.email)
      .then(e => {
        const error = [
          {
            code: 'send'
          }
        ];
        return error;
      })
      .catch(error => {
        return error;
      });
  }
  CreateUserResume(uid: string, userDetail: UserR) {
    // this.SignIn(userDetail.email, userDetail.password)
  }
}
