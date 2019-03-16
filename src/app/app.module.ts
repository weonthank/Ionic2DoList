import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

export const firebaseConfig = {
  apiKey: "AIzaSyCA3DfIzk_giqu1f_4RaMpLmet0HnfjXhA",
  authDomain: "dolist-a34cf.firebaseapp.com",
  databaseURL: "https://dolist-a34cf.firebaseio.com",
  projectId: "dolist-a34cf",
  storageBucket: "dolist-a34cf.appspot.com",
  messagingSenderId: "395990788098"
};
//firebase.initializeApp(config);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),AngularFireDatabaseModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
