import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Profil } from "src/app/models/profil.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MessagerieService } from "src/app/services/messagerie.service";
import { Message } from "src/app/models/message.model";
import { AuthentificationService } from "src/app/services/authentification.service";
@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"]
})
export class ChatPage implements OnInit {
  profil: Profil;
  monProfil: Profil;
  user: boolean = false;
  sontAmis = false;
  utilisateur: firebase.User;
  utilisateurSubscription: Subscription;
  public messages: any = [];
  messageText: any;
  senderId: string;
  receiverId: string;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    public auth: AuthentificationService,
    private router: Router,
    private messagerie: MessagerieService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      console.log(id);
      this.receiverId = id;

      if (id) {
        this.userService.getProfilByID(id).then(profil => {
          this.profil = profil;
          // this.getPublications();
          console.log(this.profil);
          this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(
            utilisateur => {
              this.senderId = utilisateur.uid;
              this.utilisateur = utilisateur;
              this.userService.getProfil(this.utilisateur).then(monProfil => {
                this.monProfil = monProfil;
                console.log(this.monProfil);
              });
            }
          );
          this.auth.emettre();
        });
      }
    });
  }

  sendMessage() {
    console.log(this.messageText);
    const message = new Message(
      this.messageText,
      this.senderId,
      this.receiverId
    );
    this.savePublication(message);
    this.messageText = "";
  }

  savePublication(message: Message) {
    this.messagerie.saveMessage(message).then(() => {
      if (this.profil.sendersMessages) {
        this.profil.sendersMessages = this.profil.sendersMessages.filter(
          elt => {
            return elt !== this.senderId;
          }
        );
        this.profil.sendersMessages.unshift(this.senderId);
      } else {
        this.profil.sendersMessages = [];
        this.profil.sendersMessages.unshift(this.senderId);
      }

      this.userService.updateProfil(this.profil).then(() => {
        // this.router.navigate(['publications']);
        console.log("update");
      });
    });
  }
}
