import { Routes } from '@angular/router';
import { HomeComponent } from './components/homepage/homepage';
import { AboutUs } from './components/about-us/about-us';
import { AdminHome } from './components/admin/adminhome/adminhome';
import { Categories } from './components/admin/categories/categories';
import { FliesComponent } from './components/admin/flies/flies';
import { Shop } from './components/shop/shop';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about-us', component: AboutUs },
  { path: 'shop', component: Shop },

  {
    path: 'admin',
    component: AdminHome,
    children: [
      { path: 'categories', component: Categories },
      { path: 'flies', component: FliesComponent },
    ],
  },
];
