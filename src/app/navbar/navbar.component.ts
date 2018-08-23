import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class Navbar {
    @Output() filterTyped = new EventEmitter<String>();

    filterTypedHandler(value) {
        this.filterTyped.emit(value);
    }
}
