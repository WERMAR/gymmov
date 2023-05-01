import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
  ],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy
  }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
