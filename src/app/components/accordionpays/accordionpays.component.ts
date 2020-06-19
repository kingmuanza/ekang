import {
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  Renderer2
} from "@angular/core";

@Component({
  selector: "app-accordionpays",
  templateUrl: "./accordionpays.component.html",
  styleUrls: ["./accordionpays.component.scss"]
})
export class AccordionpaysComponent implements AfterViewInit {
  @ViewChild("expandWrapper", { static: true }) expandWrapper: ElementRef;
  @Input("expanded") expanded: boolean = false;
  @Input("expandHeight") expandHeight: string = "2500px";
  @Input("lesVilles") lesVilles: Array<any>;
  constructor(public renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.setStyle(
      this.expandWrapper.nativeElement,
      "max-height",
      this.expandHeight
    );
  }
}
