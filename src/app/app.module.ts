import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

//ngrx
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DogsReducer } from './store/dogs/dogs.reducers';
import { DogEffects } from './store/dogs/dogs.effects';

const reducers: ActionReducerMap<any> = {
  dogs: DogsReducer
}

import { DogService } from './dogs/dogs.service';

import { AppComponent } from './app.component';
import { Gallery } from './gallery/gallery.component';
import { DogsList } from './dogsList/dogsList.component';
import { Navbar } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    Navbar,
    DogsList,
    Gallery
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([DogEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [DogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
