import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-displayville",
  templateUrl: "./displayville.page.html",
  styleUrls: ["./displayville.page.scss"]
})
export class DisplayvillePage implements OnInit {
  @Input() villeList: string;
  constructor() {}

  ngOnInit() {
    console.log(this.villeList);
  }
}
