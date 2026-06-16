import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface NavItem {
  id: string;
  label: string;
  path: string;
  exact: boolean;
  icon: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './adminhome.html',
  imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
})
export class AdminHome {
  sidebarOpen = false;

  today = new Date().toLocaleDateString('en-KE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/admin/dashboard',
      exact: true,
      icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
               <path stroke-linecap="round" stroke-linejoin="round"
                     d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zm0 9.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zm9.75-9.75A2.25 2.25 0 0115.75 3.75H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zm0 9.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>
             </svg>`,
    },
    {
      id: 'flies',
      label: 'Flies',
      path: '/admin/flies',
      exact: false,
      icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
               <path stroke-linecap="round" stroke-linejoin="round"
                     d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
             </svg>`,
    },
    {
      id: 'categories',
      label: 'Categories',
      path: '/admin/categories',
      exact: false,
      icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
               <path stroke-linecap="round" stroke-linejoin="round"
                     d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"/>
               <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z"/>
             </svg>`,
    },
    {
      id: 'orders',
      label: 'Orders',
      path: '/admin/orders',
      exact: false,
      icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
               <path stroke-linecap="round" stroke-linejoin="round"
                     d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"/>
             </svg>`,
    },
    {
      id: 'customers',
      label: 'Customers',
      path: '/admin/customers',
      exact: false,
      icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
               <path stroke-linecap="round" stroke-linejoin="round"
                     d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
             </svg>`,
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/admin/settings',
      exact: false,
      icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
               <path stroke-linecap="round" stroke-linejoin="round"
                     d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
               <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
             </svg>`,
    },
  ];
}
