import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { FullComponent } from './full/full.component';


const routes: Routes = [
    {
        path:'',
        redirectTo:'/login',
        pathMatch:'full'
    },
    {
        path: '',
        component: FullComponent,
        children: [
            {
                path:'user-details',
                loadChildren : () => import('./user-details/user-details.module').then( m => m.UserDetailsModule)
            },
            {
                path:'user-registration',
                loadChildren : () => import('./user-registration/user-registration.module').then( m => m.UserRegistrationModule)
            },
            {
                path:'upload',
                loadChildren : () => import('./file-upload/file-upload.module').then( m => m.FileUploadModule)
            }
        ]
    },
    {
        path:'login',
        loadChildren : () => import('./login/login.module').then( m => m.LoginModule)
    }
    

]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})
export class AppRoutingModule { }