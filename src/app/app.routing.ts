import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../pages/home/home';
import { OtherComponent } from '../pages/other/other.component';

const appRoutes: Routes = [{
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
}, {
    path: 'home',
    component: HomeComponent
}, {
    path: 'other',
    component: OtherComponent
}];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
