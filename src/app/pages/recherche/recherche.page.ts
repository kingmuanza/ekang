import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "src/app/services/user.service";
import { Profil } from "src/app/models/profil.model";
import { Router } from "@angular/router";
import { VilleService } from "src/app/services/ville.service";
import { Subscription } from 'rxjs';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: "app-recherche",
  templateUrl: "./recherche.page.html",
  styleUrls: ["./recherche.page.scss"]
})
export class RecherchePage implements OnInit {
  pays: any;
  userPays: any;
  userVille: any;
  userProfession: any;
  listProfesion: any;
  profils = new Array<Profil>();
  profil: Profil;
  villes: any;

  profilsResultats = new Array<Profil>();
  profilsVilles = new Array<Profil>();

  utilisateur: firebase.User;
  utilisateurSubscription: Subscription;
  
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    public auth: AuthentificationService,
    private villeService: VilleService
  ) {}

  ngOnInit() {
    this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(
      utilisateur => {
        this.utilisateur = utilisateur;
        if (!utilisateur) {
          this.router.navigate(["connexion"]);
        } else {
          this.userService.getProfil(this.utilisateur).then(profil => {
            if (profil) {
              this.profil = profil;
              const ville = profil.ville;
              this.userService.getProfilsVille(ville).then((profilsVilles)=>{
                this.profilsVilles = profilsVilles;
              });
            }
          });
        }
      }
    );
    this.auth.emettre();
    this.getCountry();
    this.getProfession();
    this.takeVille();
  }
  getCountry() {
    this.http
      .get("https://restcountries.eu/rest/v2/region/africa")
      .subscribe(data => {
        // console.log(data);
        this.pays = data;
      });
  }

  getProfession() {
    // this.userService.read_ProfessionList().subscribe(data => {
    this.userService.read_ProfessionList().then(data => {
      console.log(data);
      this.listProfesion = data;
    });
  }

  chooseCountry(ev: Event) {
    this.userPays = ev.target["value"];
  }
  chooseProfession(ev: Event) {
    this.userProfession = ev.target["value"];
  }
  chooseVille(ev: Event) {
    this.userVille = ev.target["value"];
  }
  findUsers() {
    this.userService
      .getProfilsPaysProfession(
        this.userPays,
        this.userProfession,
        this.userVille
      )
      .then(profils => {
        this.profils = profils;
        this.profilsResultats = profils;
      });
  }

  voirProfil(profil: Profil) {
    this.router.navigate(["amis", "amis-view", profil.utilisateur.uid]);
  }
  takeVille() {
    this.villeService.getVilles().then(data => {
      // console.log(data);
      this.villes = data;
    });
  }
}
