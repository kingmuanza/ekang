import { Component, OnInit } from "@angular/core";
import { VilleService } from "src/app/services/ville.service";
import { AlertController } from "@ionic/angular";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit {
  pays = [];
  pays2 = [];
  lePays: any;
  ville: String;
  isItemAvailable: Boolean = false;
  listVilles: [];
  constructor(
    private villeService: VilleService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.takePays();
  }

  takePays() {
    this.villeService.getPays().then(data => {
      data.forEach(elt => {
        this.pays = this.pays.concat(elt["pays"]);
      });
      this.pays2 = this.pays;
    });
  }
  initializePays() {
    this.pays = this.pays2;
  }
  choisirPays(p) {
    this.lePays = p;
    this.isItemAvailable = false;
    this.villeService.getVillePays({ pays: this.lePays }).then(data => {
      console.log(data);
      this.listVilles = data;
    });
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializePays();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != "") {
      this.isItemAvailable = true;
      this.pays = this.pays.filter(item => {
        return item.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }
  CreateVille() {
    this.villeService
      .verifieVille({ pays: this.lePays, ville: this.ville.toLowerCase() })
      .then(data => {
        if (data.length) {
          this.presentAlert();
        } else {
          this.villeService
            .addVille({ pays: this.lePays, ville: this.ville.toLowerCase() })
            .then(data => {
              this.ville = "";
              this.villeService
                .getVillePays({ pays: this.lePays })
                .then(data => {
                  console.log(data);
                  this.listVilles = data;
                });
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Alert",
      message: "Cette ville existe déja.",
      buttons: ["OK"]
    });

    await alert.present();
  }

  EditRecord(item) {
    console.log(item);
  }

  RemoveRecord(item) {
    console.log(item);
  }
}
