import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';

import * as DogActions from './dogs.actions';
import { DogEffects } from './dogs.effects';
import { DogService } from '../../dogs/dogs.service';

describe('Dog Effects', () => {
  let effects: DogEffects;
  let actions$: Observable<any>;
  let dogService: any;
  const mockDogBreeds = ['affenpinscher'];
  const mockDogBreedImages = ['img'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DogEffects,
        provideMockActions(() => actions$),
        {
          provide: DogService,
          useValue: jasmine.createSpyObj('DogService', [
            'getListOfDogBreeds', 'getBreedImages'
          ])
        },
      ],
    });

    effects = TestBed.get(DogEffects);
    dogService = TestBed.get(DogService);
  });

  it('should load dogs by breed', () => {
    const action = new DogActions.DogsLoading(mockDogBreeds[0]);

    const completion = new DogActions.DogsLoadSuccess(mockDogBreeds);
    const selected = new DogActions.DogSelected(mockDogBreeds[0]);
    const images = new DogActions.DogImagesLoading(mockDogBreeds[0]);
    // hot stream keeps going, hence -------
    actions$ =         hot('-a-------', { a: action });
    // emit 1 frame, then on frame 2 emit the mock http response, then end on frame 3
    const response = cold('-b|', { b: mockDogBreeds });
    // emit 2 frames, then on frame 3 emit the completed actions. 
    // this aligns with the ending of the cold stream on frame 3 in the response stream above.
    const expected = cold('--(cde)', { c: completion, d: selected, e: images });

    dogService.getListOfDogBreeds.and.returnValue(response);

    expect(effects.loadDogs$).toBeObservable(expected);
  });

  it('should load images of selected dog breeds', () => {
    const action = new DogActions.DogImagesLoading(mockDogBreeds[0]);

    const completion = new DogActions.DogImagesLoadSuccess(mockDogBreedImages);

    actions$ =        hot('-a-------', { a: action });
    const response = cold('-b|', { b: mockDogBreedImages });
    const expected = cold('--c', { c: completion });

    dogService.getBreedImages.and.returnValue(response);

    expect(effects.loadDogImages$).toBeObservable(expected);

  });

  it('should emit a load fail when there is an error', () => {
    const action = new DogActions.DogsLoading(mockDogBreeds[0]);

    const completion = new DogActions.DogsLoadFail();
    
    actions$ =        hot('-a--', { a: action });
    const response = cold('-#');
    const expected = cold('-(c|)', { c: completion });

    dogService.getBreedImages.and.returnValue(response);

    expect(effects.loadDogs$).toBeObservable(expected);
  });
});