// footer.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface FooterLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  imports: [CommonModule, FormsModule, RouterLink],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  shopLinks: FooterLink[] = [
    { label: 'Dry Flies', path: '/shop/dry-flies' },
    { label: 'Nymphs', path: '/shop/nymphs' },
    { label: 'Streamers', path: '/shop/streamers' },
    { label: 'Saltwater Flies', path: '/shop/saltwater' },
    { label: 'Fly Boxes', path: '/shop/accessories' },
  ];

  companyLinks: FooterLink[] = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Shop', path: '/shop' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  legalLinks: FooterLink[] = [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Use', path: '/terms' },
    { label: 'Shipping Policy', path: '/shipping' },
  ];
}
