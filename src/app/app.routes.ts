import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TesteComponent } from './teste/teste.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
    {path: "", component: MainComponent}, 
    {path: "teste", component: TesteComponent}
];
