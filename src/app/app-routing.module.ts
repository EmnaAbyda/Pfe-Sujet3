import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/shop/home/home.component';
import { DemoComponent } from './components/demo/demo.component';

import { AuthGuard } from './components/auth/auth.guard';
import { MyAccountComponent } from './components/pages/my-account/my-account.component';
import { ProfileComponent } from './components/pages/profile/profile.component';



const appRoutes: Routes = [
 
 /* {path:'',redirectTo:'/user/login',pathMatch:'full'},
  */
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./components/shop/shop.module').then(m => m.ShopModule)
      },
      {
        path: 'pages',
        loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule)

      },
      {
        path: 'blog',
        loadChildren: () => import('./components/blog/blog.module').then(m => m.BlogModule)
      },
    ]
  },
/*  {
    path: '**',
    redirectTo: 'home/one'
  },
 // {path:'',redirectTo:'/user/login',pathMatch:'full'},
 /* {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },*/
 /* {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'pages/my-account', component: MyAccountComponent }
    ]
  },*/
 // {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]}
 // {path:'home',component:HomeComponent,canActivate:[AuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
