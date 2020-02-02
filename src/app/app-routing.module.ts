import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { SignInComponent } from "./public/sign-in/sign-in.component";
import { PagesComponent } from "./pages/pages.component";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: PageNotFoundComponent,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: 'login',
    component: SignInComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: PagesComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent, data: { title: 'Page Not Found' } }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  exports: [RouterModule]
})
export class AppRoutingModule { }

