import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  label: string;
  path: string;
  exact: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [RouterLink, CommonModule, RouterLinkActive],
})
export class Header implements OnInit {
  isOpen = false;
  cartCount = 0;

  navLinks: NavLink[] = [
    { label: 'Home', path: '/', exact: true },
    { label: 'Shop', path: '/shop', exact: false },
    { label: 'About Us', path: '/about-us', exact: false },
  ];

  ngOnInit(): void {
    const stored = localStorage.getItem('cartCount');
    if (stored) {
      this.cartCount = parseInt(stored, 10);
    }
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  closeMenu(): void {
    this.isOpen = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent): void {
    const width = (event.target as Window).innerWidth;
    if (width >= 768) {
      this.isOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.isOpen = false;
  }
}
