import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ScreensizeService {
  private isDesktop = new BehaviorSubject<boolean>(false);
  private isConnexionPage = new BehaviorSubject<any>("connexionPage");

  constructor() {}

  onResize(size) {
    if (size < 568) {
      this.isDesktop.next(false);
    } else {
      this.isDesktop.next(true);
    }
  }

  isDesktopView(): Observable<boolean> {
    return this.isDesktop.asObservable().pipe(distinctUntilChanged());
  }
  checkConnexionPage() {
    return this.isConnexionPage.asObservable().pipe(distinctUntilChanged());
  }
}
