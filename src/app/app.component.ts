import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { DogService } from "./dogs/dogs.service";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import * as Actions from "./store/dogs/dogs.actions";
import * as Reducers from "./store/dogs/dogs.reducers";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = "marble dawgs";
  dogs$: Observable<String[]>;
  images$: Observable<String[]>;
  selected$: Observable<String>;

  constructor(private store: Store<any>, private dogService: DogService) {}

  ngOnInit() {
    this.createDogsListAndGallery("");
    this.dogs$ = this.store.select(Reducers.getDogs);
    this.images$ = this.store.select(Reducers.getDogImages);
    this.selected$ = this.store.select(Reducers.getSelected);
  }

  createDogsListAndGallery(filter) {
    this.store.dispatch(new Actions.DogsLoading(filter));
  }

  dogSelected(breed) {
    this.store.dispatch(new Actions.DogImagesLoading(breed));
    this.store.dispatch(new Actions.DogSelected(breed));
  }

  filterDogsList(value) {
    this.createDogsListAndGallery(value);
  }
}
