import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/exhaustMap';

import * as DogActions from "./dogs.actions";
import { DogService } from '../../dogs/dogs.service';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { catchError, concatMap, map } from 'rxjs/operators';

@Injectable()

export class DogEffects {
    constructor(
        private actions$: Actions,
        private dogService: DogService
    ) {}

// TODO: new effect for each action type, update in app.component calls. 
// move to map(response) and create new Error action types for each. 
// see: https://blog.angularindepth.com/switchmap-bugs-b6de69155524
@Effect() 
loadDogs$: Observable<Action> = this.actions$
    .ofType(DogActions.DOGS_LOADING)
    .exhaustMap((action: any) => this.dogService.getListOfDogBreeds(action.payload))
    .pipe(
        concatMap(data => [
            new DogActions.DogsLoadSuccess(data),
            new DogActions.DogSelected(data[0]),
            new DogActions.DogImagesLoading(data[0])
        ]),
        catchError((err) => {
            return of(new DogActions.DogsLoadFail());
        })
      );  

@Effect()
loadDogImages$: Observable<Action> = this.actions$
    .ofType(DogActions.DOG_IMAGES_LOADING)
    .exhaustMap((action: any) => this.dogService.getBreedImages(action.payload))
    .pipe(
        map((data: any) => new DogActions.DogImagesLoadSuccess(data)),
        catchError((err) => {
            return of(new DogActions.DogsLoadFail());
        })
    );
}
