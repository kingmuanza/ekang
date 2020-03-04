import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-messages",
  templateUrl: "./messages.page.html",
  styleUrls: ["./messages.page.scss"]
})
export class MessagesPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  voir() {
    //this.router.navigate(['amis', 'amis-view', this.publication.utilisateur.uid]);
    this.router.navigate(["messages", "chat"]);
  }
}
