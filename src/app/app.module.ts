import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { FIREBASE_CONFIG } from "./app.firebase.config";
import { DisplayPageModule } from "./display/display.module";
import { ShareModule } from "./share.module";
import { LikeursPageModule } from "./pages/likeurs/likeurs.module";
import { DisplayvillePageModule } from "./pages/displayville/displayville.module";
import { ModificationPageModule } from "./pages/modification/modification.module";
//import Peer from "simple-peer";

//import { HttpClientModule, HttpClient } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    DisplayPageModule,
    ShareModule,
    LikeursPageModule,
    ModificationPageModule,
    DisplayvillePageModule,
    // Peer,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
