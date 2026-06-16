import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCard } from '../shared/product-card/product-card';
import { FliesResponse } from '../../models/fly.model';
import { Category } from '../../models/category.model';
import { FlyService } from '../../services/fly/fly-service';
import { Categories } from '../admin/categories/categories';
import { CategoryService } from '../../services/category/category-service';

interface PriceRange {
  label: string;
  min: number;
  max: number;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [CommonModule, FormsModule, ProductCard],
})
export class Shop implements OnInit {
  flies: FliesResponse[] = [];
  loading = true;
  skeletons = Array(6);
  categories: Category[] = [];

  activeCategory: string | null = null;
  activePriceRange: string | null = null;
  activePriceMin = 0;
  activePriceMax = Infinity;
  searchQuery = '';
  sortOrder = 'default';
  mobileFilterOpen = false;

  priceRanges: PriceRange[] = [
    { label: 'Under KES 500', min: 0, max: 499 },
    { label: 'KES 500 – 1,000', min: 500, max: 1000 },
    { label: 'KES 1,000 – 2,000', min: 1001, max: 2000 },
    { label: 'Over KES 2,000', min: 2001, max: Infinity },
  ];

  constructor(
    private flyService: FlyService,
    private cdr: ChangeDetectorRef,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.loadFlies();
  }

  private loadFlies(): void {
    this.loading = true;
    this.flyService.getFlies().subscribe({
      next: (res) => {
        this.flies = [...res.flies];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load flies', err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  get filteredFlies(): FliesResponse[] {
    const q = this.searchQuery.trim().toLowerCase();
    return this.flies.filter((f) => {
      const matchesCategory = !this.activeCategory || f.category === this.activeCategory;
      const price = Number(f.price);
      const matchesPrice = price >= this.activePriceMin && price <= this.activePriceMax;
      const matchesSearch =
        !q || f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q);
      return matchesCategory && matchesPrice && matchesSearch;
    });
  }

  get sortedFlies(): FliesResponse[] {
    const list = [...this.filteredFlies];
    switch (this.sortOrder) {
      case 'price-asc':
        return list.sort((a, b) => Number(a.price) - Number(b.price));
      case 'price-desc':
        return list.sort((a, b) => Number(b.price) - Number(a.price));
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }

  setCategory(name: string | null): void {
    this.activeCategory = name;
  }

  setPriceRange(range: PriceRange): void {
    this.activePriceRange = range.label;
    this.activePriceMin = range.min;
    this.activePriceMax = range.max;
  }

  clearPriceRange(): void {
    this.activePriceRange = null;
    this.activePriceMin = 0;
    this.activePriceMax = Infinity;
  }

  clearFilters(): void {
    this.activeCategory = null;
    this.searchQuery = '';
    this.sortOrder = 'default';
    this.clearPriceRange();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = [...response.categories];
        this.cdr.detectChanges();
      },
      error: (err) => {
        alert(err.error);
      },
    });
  }

  countByCategory(name: string): number {
    return this.flies.filter((f) => f.category === name).length;
  }

  onAddToCart(fly: FliesResponse): void {
    console.log('Added to cart:', fly);
  }
}
