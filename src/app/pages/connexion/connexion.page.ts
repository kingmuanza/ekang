import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {


  connexionForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(public auth: AuthentificationService, public toastController: ToastController, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.initConnexionForm();
  }

  initConnexionForm() {
    this.connexionForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.email]],
      passe: ['', [Validators.required]]
    });
  }

  onConnexionFormSubmit() {
    console.log('onConnexionFormSubmit');
    const value = this.connexionForm.value;
    const login = value.login;
    const passe = value.passe;
    this.auth.connexion(login, passe).then(() => {
      this.connexion();
    });
  }

  connexion() {
    this.router.navigate(['accueil']);
  }

  inscription() {
    this.router.navigate(['inscription']);
  }

}
