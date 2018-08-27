import { Component, Input } from '@angular/core';

@Component({
    selector: 'gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class Gallery {
    @Input() images: String[];
    @Input() busy: boolean;
    @Input() selected: String;
}
