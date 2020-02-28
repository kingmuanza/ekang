import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Subscription } from 'rxjs';
import { Publication } from 'src/app/models/publication.model';
import { PublicationService } from 'src/app/services/publication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationEkang } from 'src/app/models/notification.model';
import { Profil } from 'src/app/models/profil.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-publications-edit',
  templateUrl: './publications-edit.page.html',
  styleUrls: ['./publications-edit.page.scss'],
})
export class PublicationsEditPage implements OnInit {

  publicationForm: FormGroup;
  utilisateur: firebase.User;
  profil: Profil;
  utilisateurSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private notifService: NotificationService,
    private pubService: PublicationService,
    public auth: AuthentificationService) { }

  ngOnInit() {
    this.initForm();
    this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(utilisateur => {
      this.utilisateur = utilisateur;
      if(this.utilisateur) {
        this.userService.getProfil(utilisateur).then((profil)=>{
          this.profil = profil;
        });
      }
    });
    this.auth.emettre();
  }

  initForm() {
    this.publicationForm = this.formBuilder.group({
      texte: ['', [Validators.required]]
    });
  }

  onSubmitPublicationForm() {
    const value = this.publicationForm.value;
    console.log('value');
    console.log(value);
    const publication = new Publication(value.texte, this.utilisateur);
    this.pubService.savePublication(publication).then(() => {
      if(this.profil) {
        const notification = new NotificationEkang(this.profil, 'PUBLICATION');
        notification.publication = publication;
        this.notifService.createNotification(notification).then(()=>{
          this.router.navigate(['publications']);
        });
      } else {
        this.router.navigate(['publications']);
      }
    })
  }

}
