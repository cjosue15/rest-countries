import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
    body = document.querySelector('body');
    dark: boolean;
    constructor() {
        this.dark = false;
        this.dark = localStorage.getItem('theme') === 'dark-mode' ? true : false;
    }

    ngOnInit(): void {}

    changeTheme() {
        if (this.body.classList.contains('dark-mode')) {
            this.body.classList.remove('dark-mode');
            this.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
            this.dark = false;
        } else {
            this.body.classList.remove('light-mode');
            this.body.classList.add('dark-mode');
            this.dark = true;
            localStorage.setItem('theme', 'dark-mode');
        }
    }
}
