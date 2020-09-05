import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FilterComponent } from './filter/filter.component';
import { LoaderComponent } from './loader/loader.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [HeaderComponent, FilterComponent, LoaderComponent, FooterComponent],
    imports: [CommonModule, RouterModule],
    exports: [HeaderComponent, FilterComponent, LoaderComponent, FooterComponent],
    providers: [],
})
export class ComponentsModule {}
