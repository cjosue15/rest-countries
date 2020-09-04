import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
    @ViewChild('menu', { static: false }) menu: ElementRef;
    @Input() selected: any;
    @Input() data: any[];
    @Output() selectChange = new EventEmitter<any>();
    open: boolean;
    constructor() {
        this.data = [];
        this.selected = { id: '', text: '' };
        this.open = false;
    }

    ngOnInit(): void {}

    abrirOpciones() {
        if (this.menu.nativeElement.classList.contains('active')) {
            this.open = false;
            this.menu.nativeElement.classList.remove('active');
        } else {
            this.open = true;
            this.menu.nativeElement.classList.add('active');
        }
        // this.menu.nativeElement.classList.toggle('active');
    }

    selectItem(item) {
        this.selectChange.emit(item);
        this.open = false;
        this.menu.nativeElement.classList.remove('active');
    }
}
