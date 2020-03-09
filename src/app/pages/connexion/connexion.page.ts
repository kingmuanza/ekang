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

  connexionForm: FormGroup; // Formulaire de connexion
  inactif = false; // Empeche l'utilisateur de cliquer deux fois sur le bouton SUBMIT

  constructor(
    public auth: AuthentificationService,
    public toastController: ToastController,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.initConnexionForm();
  }

  initConnexionForm(): void{
    this.connexionForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.email]],
      passe: ['', [Validators.required]]
    });
  }

  onConnexionFormSubmit(): void{
    this.inactif = true; // bouton inactif
    console.log('onConnexionFormSubmit');
    const value = this.connexionForm.value;
    const login = value.login;
    const passe = value.passe;
    this.auth.connexion(login, passe).then(() => {
      this.inactif = false; // bouton actif
      this.connexion();
    });
  }

  connexion(): void{
    this.router.navigate(['accueil']);
  }

  inscription(): void{
    this.router.navigate(['inscription']);
  }

}
