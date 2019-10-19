import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    // allows dynamic importing of code in this module. Promise resolves to actual module class
    // path: 'login', loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    path: 'login', loadChildren: './user/user.module#UserModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
