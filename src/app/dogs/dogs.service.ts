import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

@Injectable()

export class DogService {
    dogBreedsUrl = 'https://dog.ceo/api/breeds/list';
    breedImagesUrl = 'https://dog.ceo/api/breed/';

    fetchingImages = false;

    constructor(private http: HttpClient) {}

    getListOfDogBreeds(filter) {
        return this.http.get(this.dogBreedsUrl)
            .pipe(
                map((data: any) => {
                    data = data.message;
                    return data.filter((item) => item.includes(filter));
                })
            )
    }

    getBreedImages(breed) {
        this.fetchingImages = true;
        return this.http.get(`${this.breedImagesUrl}${breed}/images`)
            .pipe(
                tap(() => { this.fetchingImages = false }),
                map((data: any) => data.message)
            );
    }
}
