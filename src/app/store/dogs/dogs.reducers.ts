import { createFeatureSelector, createSelector, ActionReducer } from '@ngrx/store';
import * as Actions from './dogs.actions';

export const initialState = {
    dogs: {
        selected: '',
        dogs: [],
        images: []
    }
};

export function DogsReducer(state = initialState, action: Actions.All) {
    switch (action.type) {
        case Actions.DOG_SELECTED: {
            return { ...state, selected: action.payload };
        }
        case Actions.DOGS_LOAD_SUCCESS: {
            return { ...state, dogs: action.payload };
        }
        case Actions.DOG_IMAGES_LOAD_SUCCESS: {
            return { ...state, images: action.payload };
        }
        default: {
            return state;
        }
    }
}

export const getSelected = (state: any) => state.dogs.selected;
export const getDogs = (state: any) => state.dogs.dogs;
export const getDogImages = (state: any) => state.dogs.images;
