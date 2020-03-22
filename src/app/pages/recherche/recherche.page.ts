import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "src/app/services/user.service";
import { Profil } from "src/app/models/profil.model";
import { Router } from "@angular/router";
import { VilleService } from "src/app/services/ville.service";
import { Subscription } from "rxjs";
import { AuthentificationService } from "src/app/services/authentification.service";

@Component({
  selector: "app-recherche",
  templateUrl: "./recherche.page.html",
  styleUrls: ["./recherche.page.scss"]
})
export class RecherchePage implements OnInit {
  public items: any;
  public items2: any;
  pays: any;
  userPays: any;
  userVille: string = "Localisation géographique";
  userProfession: any;
  listProfesion: any;
  profils = new Array<Profil>();
  profil: Profil;
  villes: any;
  expandedVille: boolean = false;
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
  ) {
    /* this.items = [
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false }
    ]; */
    this.items = { expanded: false, name: "situation geographique" };
    this.items2 = { expanded: false, name: "situation geographique" };
  }

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
              this.userService.getProfilsVille(ville).then(profilsVilles => {
                this.profilsVilles = profilsVilles;
              });
            }
          });
        }
      }
    );
    this.auth.emettre();
    // this.getCountry();
    this.getProfession();
    //this.takeVille();
  }
  getCountry() {
    this.http
      .get("https://restcountries.eu/rest/v2/region/europe")
      .subscribe(data => {
        console.log(data);
        this.pays = data;
        this.pays.forEach(p => {
          this.villeService
            .addPays(p)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        });
        this.takeVille();
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
      console.log(data);
      data.forEach(v => {
        v["expanded"] = false;
      });
      this.villes = data;
      this.pays.forEach(p => {
        p["expanded"] = false;
        p["expandedVille"] = false;
        if (p.name === "Cameroon") {
          p["ville"] = this.villes;
        } else {
          p["ville"] = [
            { nom: "ville1" },
            { nom: "ville2" },
            { nom: "ville3" },
            { nom: "ville4" }
          ];
        }
      });
    });
  }

  expandItem(): void {
    this.items.expanded = !this.items.expanded;
  }
  expandItem2(): void {
    this.items2.expanded = !this.items2.expanded;
  }

  expandItem3(p): void {
    console.log(p);
    this.userPays = p.name;
    p.expandedVille = !p.expandedVille;
    if (p.expanded) {
      p.expanded = false;
    } else {
      this.pays.map(listItem => {
        if (p == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  closeExpand(ville, p) {
    this.userVille = ville;

    this.items.expanded = !this.items.expanded;
    p.expandedVille = !p.expandedVille;
    if (p.expanded) {
      p.expanded = false;
    } else {
      this.pays.map(listItem => {
        if (p == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
    this.items2.expanded = !this.items2.expanded;
  }
}
