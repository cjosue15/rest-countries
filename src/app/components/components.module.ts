import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FilterComponent } from './filter/filter.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
    declarations: [HeaderComponent, FilterComponent, LoaderComponent],
    imports: [CommonModule],
    exports: [HeaderComponent, FilterComponent, LoaderComponent],
    providers: [],
})
export class ComponentsModule {}
