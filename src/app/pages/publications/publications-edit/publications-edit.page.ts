import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild("fileButton", { static: false }) fileButton;
  publicationForm: FormGroup;
  utilisateur: firebase.User;
  profil: Profil;
  utilisateurSubscription: Subscription;
  file: any;
  photoURL: string;
  imageUrl: string;

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
      if (this.utilisateur) {
        this.userService.getProfil(utilisateur).then((profil) => {
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
    publication.profil = this.profil;
    if (this.photoURL) {
      this.enregistrerImageFirebase().then((url)=>{
        publication.cover = url;
        this.savePublication(publication);
      })
      
    } else {
      this.savePublication(publication);
    }
  }

  savePublication(publication: Publication) {
    this.pubService.savePublication(publication).then(() => {
      if (this.profil) {
        const notification = new NotificationEkang(this.profil, 'PUBLICATION');
        notification.publication = publication;
        this.notifService.createNotification(notification).then(() => {
          this.router.navigate(['publications']);
        });
      } else {
        this.router.navigate(['publications']);
      }
    });
  }

  galerie() {
    this.fileButton.nativeElement.click();
  }

  uploadFile(event: any) {
    console.log(event.target.files);
    this.file = event.target.files.item(0);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.photoURL = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  resetImage() {
    this.photoURL = null;
  }

  enregistrerImageFirebase(): Promise<string> {
    return new Promise((resolve, reject) => {
      var storageRef = firebase.storage().ref(this.utilisateur.email + "/publications/" + this.file.name);
      var task = storageRef.put(this.file);
      task.then(data => {
        console.log('data');
        console.log(data);
        storageRef.getDownloadURL().then(url => {
          resolve(url);
        }).catch((e)=>{
          reject(e);
        });
      }).catch((e)=>{
        reject(e);
      });
    });
  }

}

