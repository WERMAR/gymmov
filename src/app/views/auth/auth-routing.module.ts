import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthPage} from './view/auth.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: AuthPage,
    children: [
      {
        path: 'register',
        children: [
          {
            path: '',
            loadChildren: () => import('./components/registration/registration.module').then(m => m.RegistrationPageModule)
          }
        ]
      },
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: () => import('./components/login/login.module').then(m => m.LoginPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/auth/tabs/login',
        pathMatch: 'full'
      }
    ],
  },
  {
    path: '',
    redirectTo: '/auth/tabs/login',
    pathMatch: 'full'
  },
  {
    path: 'registration1',
    loadChildren: () => import('./components/registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {
}
