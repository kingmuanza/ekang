import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Profil } from "src/app/models/profil.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { PublicationService } from 'src/app/services/publication.service';
import { Publication } from 'src/app/models/publication.model';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: "app-amis-view",
  templateUrl: "./amis-view.page.html",
  styleUrls: ["./amis-view.page.scss"]
})
export class AmisViewPage implements OnInit {
  profil: Profil;
  monProfil: Profil;
  user: boolean = false;
  sontAmis = false;
  utilisateur: firebase.User;
  utilisateurSubscription: Subscription;
  publications = new Array<Publication>();
  
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private publicationService: PublicationService, 
    public auth: AuthentificationService,
    private router: Router,
    private pubService: PublicationService,
    private notifService: NotificationService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      if (id) {
        this.userService.getProfilByID(id).then(profil => {
          this.profil = profil;
          this.getPublications();
          console.log(this.profil);
          this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(
            utilisateur => {
              this.utilisateur = utilisateur;
              this.userService.getProfil(this.utilisateur).then((monProfil)=>{
                this.monProfil = monProfil;
                this.sontAmis = this.sontIlsAmis();
              });
            }
          );
          this.auth.emettre();
        });
      }
    });
  }

  sontIlsAmis() {
    if(this.monProfil && this.profil) {
      if(this.monProfil.abonnements) {
        const resultats = this.monProfil.abonnements.find((index)=>{
          return index === this.profil.utilisateur.uid;
        });
        if(resultats) {
          return true
        }
      }
    }
    return false
  }

  getPublications() {
    this.publicationService.getPublications().then((publications)=>{
      this.publications = publications.filter((publication)=>{
        return publication.utilisateur.uid === this.profil.utilisateur.uid;
      });
    });
  }

  

  enregistrerTout() {
    // On met à jour les profils
    this.userService.updateProfil(this.monProfil).then((pA)=>{
      this.monProfil = pA;
      this.sontAmis = this.sontIlsAmis();
      this.userService.updateProfil(this.profil).then((pB)=>{
        this.profil = pB;
        this.sontAmis = this.sontIlsAmis();
      });
    });
  }

  suivre() {
    if(!this.monProfil.abonnements) {
      this.monProfil.abonnements = new Array<string>();
    }
    this.monProfil.abonnements.unshift(this.profil.utilisateur.uid);
    if(!this.profil.abonnes){
      this.profil.abonnes = new Array<string>();
    }
    this.profil.abonnes.unshift(this.monProfil.utilisateur.uid);
    this.enregistrerTout();
  }

  unSuivre() {
    this.monProfil.abonnements = this.monProfil.abonnements.filter(s => {
      return s !== this.profil.utilisateur.uid;
    });
    this.profil.abonnes = this.profil.abonnes.filter(s => {
      return s !== this.monProfil.utilisateur.uid;
    });
    this.enregistrerTout();
  }


  // Permet d'extraire un lien d'une URL
  urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => {
      return '<a target="_blank" href="' + url + '">' + url + '</a>';
    });
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
  }



  ouvrirPublication(publication) {
    this.router.navigate([
      "publications",
      "publications-view",
      publication.id
    ]);
  }

  onClick() { }


}
