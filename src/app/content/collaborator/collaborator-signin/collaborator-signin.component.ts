import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../../../core/interface/login';
import { AuthService } from '../../../core/service/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collaborator-signin',
  templateUrl: './collaborator-signin.component.html',
  styleUrls: ['./collaborator-signin.component.css']
})
export class CollaboratorSigninComponent implements OnInit {

  login_form: FormGroup;
  error_message: string;
  enviarcorreo: false;
  correo: Login;
  constructor(private auth: AuthService, private formBuild: FormBuilder, private afAuth: AngularFireAuth, private router: Router) {
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.router.navigate(['home/dashboard']);
      } else {
        this.auth.SignOut();
      }
    });
    this.login_form = this.formBuild.group(
      {
        email: ['', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zñA-ZÑ0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        ]],
        password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15)
        ]]
      }
    );
  }
  login(userLogin: Login, isValid: boolean): void {
    this.error_message = '';
    if (isValid) {
      this.auth.SignIn(userLogin)
        .subscribe(resolve => {
          if (resolve !== true) {
            console.log(resolve);
            if (resolve.code === 'auth/wrong-password') {
              console.log('La password es incorrecta.');
              this.login_form.reset();
            } else if (resolve.code === 'auth/user-not-found') {
              console.log('El email ingresado no existe.');
              this.login_form.reset();
            } else if (resolve[0].code === 'EmailError') {
              console.log('Verifique su correo electronico.');
              this.enviarcorreo = resolve[0].enviar;
              this.correo = userLogin;
              this.login_form.reset();
            }
          }
        });
    }
  }
  verficar() {
    this.auth.ConfirmationEmail(this.correo.email, this.correo.password)
      .then(resolve => {
        this.auth.SignOut();
        console.log('Revisa tu correo electronico');
        this.enviarcorreo = false;
        this.login_form.reset();
      });
  }

}
