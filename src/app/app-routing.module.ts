import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { CatDetailComponent } from './pages/catDetail/catDetail.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'detail', component: CatDetailComponent },
  // { path: 'artist/:id', component: '' },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
