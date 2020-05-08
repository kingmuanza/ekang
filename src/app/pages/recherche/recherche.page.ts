import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "src/app/services/user.service";
import { Profil } from "src/app/models/profil.model";
import { Router } from "@angular/router";
import { VilleService } from "src/app/services/ville.service";
import { Subscription } from "rxjs";
import { AuthentificationService } from "src/app/services/authentification.service";
import { ModalController } from "@ionic/angular";
//import { DisplayvillePage } from "../displayville/displayville.page";

@Component({
  selector: "app-recherche",
  templateUrl: "./recherche.page.html",
  styleUrls: ["./recherche.page.scss"]
})
export class RecherchePage implements OnInit {
  public items: any;
  public items2: any;
  public itemsAmerique: any;
  public itemsEurope: any;
  pays = [];
  paysEurope = [];
  paysAmerique = [];
  paysAsie = [];
  afrique: any;
  europe: any;
  amerique: any;
  asie: any;
  userPays: any;
  userVille: string = "Localisation géographique";
  userProfession: any;
  listProfesion: any;
  profils = new Array<Profil>();
  profil: Profil;
  villes: any;
  lesVilles: any;
  expandedVille: boolean = false;
  profilsResultats = new Array<Profil>();
  profilsVilles = new Array<Profil>();

  utilisateur: firebase.User;
  utilisateurSubscription: Subscription;

  automaticClose = false;
  continent: any[];
  closeIndex: any;
  closeChildIndex: any;
  checkPays: boolean = false;
  temporaire: any;
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    public auth: AuthentificationService,
    private villeService: VilleService,
    public modalController: ModalController
  ) {
    this.continent = [
      { name: "Afrique", children: [] },
      { name: "Asie", children: [] },
      { name: "Amerique", children: [] },
      { name: "Europe", children: [] },
      { name: "Oceanie", children: [] }
    ];
    this.continent[0].open = false;
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
    this.getCountry();
    this.getProfession();
    //this.takeVille();
  }
  getCountry() {
    let tab = [];
    /*   this.http
      .get("https://restcountries.eu/rest/v2/region/oceania")
      .subscribe(data => {
        console.log(data);
        this.pays = data;
        this.pays.forEach(p => {
          
          tab.push(p.name);
        });
       
        this.takeVille();
      }); */
    this.villeService.getPays().then(data => {
      //  console.log(data);

      data.forEach(elt => {
        if (elt["continent"] == "Afrique") {
          this.afrique = elt["pays"];
          this.afrique.forEach(elt => {
            this.pays.push({ name: elt });
          });

          const indice = this.continent.findIndex(
            elt => elt.name === "Afrique"
          );
          this.continent[indice]["children"] = this.pays;
        }
        if (elt["continent"] == "Europe") {
          this.europe = elt["pays"];
          this.europe.forEach(elt => {
            this.paysEurope.push({ name: elt });
          });
          const indice = this.continent.findIndex(elt => elt.name === "Europe");
          this.continent[indice]["children"] = this.paysEurope;
        }
        if (elt["continent"] == "Amerique") {
          this.amerique = elt["pays"];
          this.amerique.forEach(elt => {
            this.paysAmerique.push({ name: elt });
          });
          const indice = this.continent.findIndex(
            elt => elt.name === "Amerique"
          );
          this.continent[indice]["children"] = this.paysAmerique;
        }
        if (elt["continent"] == "Oceanie") {
          this.asie = elt["pays"];
          this.asie.forEach(elt => {
            this.paysAsie.push({ name: elt });
          });

          const indice = this.continent.findIndex(
            elt => elt.name === "Oceanie"
          );
          this.continent[indice]["children"] = this.paysAsie;
        }
      });

      //  console.log(this.continent);

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
        console.log(profils);

        this.profils = profils;
        this.profilsResultats = profils;
      });
  }

  voirProfil(profil: Profil) {
    this.router.navigate(["amis", "amis-view", profil.utilisateur.uid]);
  }
  takeVille() {
    this.villeService.getVilles().then(data => {
      data.forEach(v => {
        v["expanded"] = false;
      });
      this.villes = data;
      this.pays.forEach(p => {
        if (p.name === "Cameroon") {
          p["ville"] = this.villes;
        } else {
          // this.takeVilleParPays(p.name);
          p["ville"] = [
            { nom: "ville1" },
            { nom: "ville2" },
            { nom: "ville3" },
            { nom: "ville4" }
          ];
        }
      });

      this.paysEurope.forEach(p => {
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

      this.paysAmerique.forEach(p => {
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

  prendreLesVilles() {
    this.villeService.getVilles().then(data => {
      // console.log(data);
    });
  }

  expandItem3(p): void {
    console.log(p);
    this.userPays = p.name;
    p.expandedVille = !p.expandedVille;

    /* this.villeService.getVillePays({ pays: p.name }).then(data => {
      console.log(data);
      // this.listVilles = data;
      this.lesVilles = data;
    }); */
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

  toggleSection(index) {
    this.closeIndex = index;
    this.continent[index].open = !this.continent[index].open;

    if (this.automaticClose && this.continent[index].open) {
      this.continent
        .filter((item, itemIndex) => itemIndex != index)
        .map(item => (item.open = false));
    }
  }

  toggleItem(index, childIndex, pays) {
    console.log("pays", pays);
    this.closeIndex = index;
    this.closeChildIndex = childIndex;
    if (this.temporaire && this.temporaire === pays.name) {
      console.log("rien");
    } else {
      this.villeService.getVillePays({ pays: pays.name }).then(data => {
        // console.log(data);
        this.temporaire = pays.name;
        // this.listVilles = data;
        pays["ville"] = data;
      });
    }

    this.continent[index].children[childIndex].open = !this.continent[index]
      .children[childIndex].open;
  }

  displayVille($event) {
    //  console.log($event);

    this.userPays = $event["pays"];
    this.userVille = $event["ville"];
    this.continent[this.closeIndex].children[this.closeChildIndex].open = !this
      .continent[this.closeIndex].children[this.closeChildIndex].open;

    this.continent[this.closeIndex].open = !this.continent[this.closeIndex]
      .open;

    this.checkPays = false;
  }
  takeVilleParPays(pays) {
    this.villeService.getVilleParPays(pays).then(data => {
      // console.log(data);
    });
  }
}
