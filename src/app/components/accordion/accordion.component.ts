import {
  Component,
  AfterViewInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  Renderer2
} from "@angular/core";

@Component({
  selector: "app-accordion",
  templateUrl: "./accordion.component.html",
  styleUrls: ["./accordion.component.scss"]
})
export class AccordionComponent {
  @Input("product") product: any;
  @Output() valueChange = new EventEmitter();
  constructor(public renderer: Renderer2) {}

  valueChanged(product) {
    // You can give any function name

    this.valueChange.emit(product);
  }
  selectItem(product) {
    this.valueChanged(product);
  }
}
