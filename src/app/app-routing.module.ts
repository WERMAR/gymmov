import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthenticationGuard} from "./shared/auth/authentication.guard";

const routes: Routes = [
  {
    path: 'app/firstlogin',
    loadChildren: () => import('./views/firstlogin/firstlogin.module').then( m => m.FirstloginPageModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./views/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthPageModule),
  },
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
