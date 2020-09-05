import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
    body = document.querySelector('body');
    constructor() {}

    ngOnInit(): void {}

    changeTheme() {
        if (this.body.classList.contains('dark-mode')) {
            this.body.classList.remove('dark-mode');
            this.body.classList.add('ligth-mode');
        } else {
            this.body.classList.remove('ligth-mode');
            this.body.classList.add('dark-mode');
        }
    }
}
