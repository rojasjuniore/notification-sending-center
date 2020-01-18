import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from "./sign-in/sign-in.component";

const routes: Routes = [
    {
        path: '',
        data: { title: 'Sign In' },
        children: [
            {
                path: '',
                redirectTo: 'Sign In'
            },
            {
                path: 'sign-in',
                component: SignInComponent,
                data: {
                    title: 'Sign In'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes,), ],
    exports: [RouterModule]
})
export class PublicRoutingModule { }
