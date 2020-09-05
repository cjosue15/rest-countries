import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    body = document.querySelector('body');
    constructor() {
        const theme = localStorage.getItem('theme') || 'dark-mode';
        this.body.classList.add(theme);
    }

    ngOnInit(): void {}
}
