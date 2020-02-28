import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicationService } from 'src/app/services/publication.service';
import { Publication } from 'src/app/models/publication.model';
import { Subscription } from 'rxjs';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.page.html',
  styleUrls: ['./publications.page.scss'],
})
export class PublicationsPage implements OnInit {

  utilisateur: firebase.User;
  utilisateurSubscription: Subscription;
  publications = new Array<Publication>();
  constructor(
    private router: Router,
    private pubService: PublicationService,
    public auth: AuthentificationService) { }

  ngOnInit() {
    this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(utilisateur => {
      if (utilisateur) {
        this.utilisateur = utilisateur;
        this.pubService.getPublicationsFromUser(this.utilisateur).then((publications)=>{
          if(publications) {
            this.publications = publications;
            console.log('this.publications');
            console.log(this.publications);
          }
        });
      } else {
        this.router.navigate(['connexion']);
      }
    });
    this.auth.emettre();
  }

  nouveau() {
    this.router.navigate(['publications', 'publications-edit'])
  }

}
