import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from "@angular/core";

@Component({
  selector: "dogs-list",
  templateUrl: "./dogsList.component.html",
  styleUrls: ["./dogsList.component.css"]
})
export class DogsList {
  _dogs: String[];
  @Input()
  selected: String;
  @Output()
  dogClicked = new EventEmitter<String>();

  @Input()
  set dogs(dogs: String[]) {
    this._dogs = (dogs && dogs.length && dogs.sort()) || [];
  }

  get dogs() {
    return this._dogs;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngOnInit() {
    console.log("dogs list initialized");
  }
  /**
   * Dog click handler
   * @param dog
   */
  clicked(dog) {
    this.dogClicked.emit(dog);
  }

  isSelected(breed) {
    return breed === this.selected;
  }

}
