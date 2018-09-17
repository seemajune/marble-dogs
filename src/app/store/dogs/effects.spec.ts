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

