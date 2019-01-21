import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './Components/Page/page';
import UsersTable from './Components/UsersTable/usersTable';
import UsersFilter from './Components/UsersFilter/usersFilter';

@NgModule({
    declarations: [
        AppComponent,
        UsersTable,
        UsersFilter
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
