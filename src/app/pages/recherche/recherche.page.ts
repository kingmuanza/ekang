import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "src/app/services/user.service";
import { Profil } from "src/app/models/profil.model";
import { Router } from "@angular/router";
import { VilleService } from "src/app/services/ville.service";

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
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private villeService: VilleService
  ) {}

  ngOnInit() {
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
      /* this.listProfesion = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()["nom"]
          // Age: e.payload.doc.data()['Age'],
          // Address: e.payload.doc.data()['Address'],
        };
      }); */
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
