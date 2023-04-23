import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'training',
    loadChildren: () => import('./training/training.module').then(m => m.TrainingPageModule)
  },
  {
    path: 'check-in',
    loadChildren: () => import('./check-in/check-in.module').then(m => m.CheckInPageModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {
}
