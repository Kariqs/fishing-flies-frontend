import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { Category, CreateCategoryRequest } from '../../../models/category.model';
import { CategoryService } from '../../../services/category/category-service';

@Component({
  selector: 'app-categories',
  standalone: true,
  templateUrl: './categories.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class Categories implements OnInit {
  categories: Category[] = [];

  showModal = false;
  editing: Category | null = null;
  submitted = false;

  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private cdr = inject(ChangeDetectorRef);

  form = this.createForm();

  ngOnInit(): void {
    this.getCategories();
  }

  private createForm() {
    return this.fb.nonNullable.group({
      name: ['', [Validators.required]],
      description: [''],
    });
  }

  private resetForm() {
    this.form.reset({
      name: '',
      description: '',
    });

    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  openModal(cat?: Category): void {
    this.editing = cat ?? null;
    this.submitted = false;

    if (cat) {
      this.form.patchValue({
        name: cat.name,
        description: cat.description,
      });
    } else {
      this.resetForm();
    }

    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editing = null;
    this.submitted = false;
    this.resetForm();
  }

  save(): void {
    this.submitted = true;

    if (this.form.invalid) return;

    const payload: CreateCategoryRequest = this.form.getRawValue();

    if (this.editing) {
      const updated: Category = {
        ID: this.editing.ID,
        ...payload,
      };

      const idx = this.categories.findIndex((c) => c.ID === this.editing!.ID);

      if (idx !== -1) {
        this.categories[idx] = updated;
        this.categories = [...this.categories];
      }

      this.closeModal();
      return;
    }

    this.categoryService.createCategory(payload).subscribe({
      next: (res) => {
        alert(res.message);

        if (res.category) {
          this.categories = [...this.categories, res.category];
        }

        this.closeModal();
      },
      error: (err) => {
        alert(err?.message ?? 'Failed to create category');
      },
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = [...(response.categories || [])];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Failed to load categories');
      },
    });
  }

  deleteCategory(id: number): void {
    if (!confirm('Delete this category?')) return;

    this.categories = this.categories.filter((c) => c.ID !== id);
  }
}
