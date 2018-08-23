import { Action } from '@ngrx/store';

export const DOG_SELECTED = 'Dogs: Dog Selected';
export const DOGS_LOADING = 'Dogs: Get Dogs Loading';
export const DOGS_LOAD_SUCCESS = 'Dogs: Get Dogs Load Success';
export const DOG_IMAGES_LOADING = 'Dogs: Get Dog Images Loading';
export const DOG_IMAGES_LOAD_SUCCESS = 'Dogs: Get Dog Images Load Success';
export const DOGS_LOAD_FAIL = 'Dogs: Load Dogs Fail';

export class DogSelected implements Action {
    readonly type = DOG_SELECTED;
    constructor (public payload: string) {}
}

export class DogsLoading implements Action {
    readonly type = DOGS_LOADING;
    constructor (public payload: string) {}
}

export class DogsLoadSuccess implements Action {
    readonly type = DOGS_LOAD_SUCCESS;
    constructor (public payload: string[]) {}
}

export class DogImagesLoading implements Action {
    readonly type = DOG_IMAGES_LOADING;
    constructor (public payload: string) {}
}

export class DogImagesLoadSuccess implements Action {
    readonly type = DOG_IMAGES_LOAD_SUCCESS;
    constructor (public payload: string[]) {}
}
export class DogsLoadFail implements Action { //todo: add more fail types
    readonly type = DOGS_LOAD_FAIL;
    constructor (public payload?: any) {}
}

export type All = DogSelected | DogsLoading | DogsLoadSuccess | DogImagesLoading | DogImagesLoadSuccess | DogsLoadFail;
