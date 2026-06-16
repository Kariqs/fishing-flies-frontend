// flies.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Category } from '../../../models/category.model';
import { FlyService } from '../../../services/fly/fly-service';
import { FliesResponse } from '../../../models/fly.model';
import { CategoryService } from '../../../services/category/category-service';

@Component({
  selector: 'app-flies',
  templateUrl: './flies.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DecimalPipe],
})
export class FliesComponent implements OnInit {
  flies: FliesResponse[] = [];

  categories: Category[] = [];

  hookSizes = ['4', '6', '8', '10', '12', '14', '16', '18', '20'];

  hookTypes = [
    'Standard Dry',
    'Standard Wet',
    'Nymph',
    'Streamer',
    'Saltwater',
    'Scud / Shrimp',
    'Jig',
    'Emerger',
  ];

  showModal = false;
  editing: FliesResponse | null = null;
  saving = false;

  flyForm!: FormGroup;

  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private flyService: FlyService,
    private cdr: ChangeDetectorRef,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.buildForm();
    this.loadFlies();
  }

  private buildForm(): void {
    this.flyForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [null, [Validators.required, Validators.min(1)]],
      categoryId: ['', Validators.required],
      hookSize: ['', Validators.required],
      hookType: ['', Validators.required],
      color: ['', Validators.required],
    });
  }

  private loadFlies(): void {
    this.flyService.getFlies().subscribe({
      next: (res) => {
        this.flies = [...res.flies];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load flies', err),
    });
  }

  openModal(fly?: FliesResponse): void {
    this.editing = fly ?? null;
    this.selectedFile = null;
    this.imagePreview = fly?.imageUrl ?? null;

    if (fly) {
      this.flyForm.patchValue({
        name: fly.name,
        price: fly.price,
        hookSize: fly.hookSize,
        // description, categoryId, hookType, color are not in FliesResponse
        // patchValue silently ignores missing keys — fill them if your API returns them
      });
    } else {
      this.flyForm.reset();
    }

    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editing = null;
    this.selectedFile = null;
    this.imagePreview = null;
    this.flyForm.reset();
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  save(): void {
    this.flyForm.markAllAsTouched();
    if (this.flyForm.invalid) return;

    const fd = new FormData();
    const v = this.flyForm.value;

    fd.append('name', v.name);
    fd.append('description', v.description ?? '');
    fd.append('price', String(v.price));
    fd.append('categoryId', String(v.categoryId));
    fd.append('hookSize', v.hookSize);
    fd.append('hookType', v.hookType);
    fd.append('color', v.color);

    if (this.selectedFile) {
      fd.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.saving = true;

    if (this.editing) {
      this.flyService.updateFly(this.editing.ID, fd).subscribe({
        next: (res) => {
          alert(res.message);
          this.loadFlies();
          this.saving = false;
          this.closeModal();
        },
        error: (err) => {
          console.error('Update failed', err);
          alert(err?.error?.message ?? 'Update failed. Please try again.');
          this.saving = false;
        },
      });
    } else {
      this.flyService.createFly(fd).subscribe({
        next: (res) => {
          alert(res.message);
          this.loadFlies();
          this.saving = false;
          this.closeModal();
        },
        error: (err) => {
          console.error('Create failed', err);
          alert(err?.error?.message ?? 'Create failed. Please try again.');
          this.saving = false;
        },
      });
    }
  }

  deleteFly(id: number): void {
    if (!confirm('Delete this fly?')) return;

    this.flyService.deleteFly(id).subscribe({
      next: () => {
        this.flies = this.flies.filter((f) => f.ID !== id);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Delete failed', err),
    });
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

  isInvalid(field: string): boolean {
    const ctrl = this.flyForm.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  getCategoryName(id: number): string {
    return this.categories.find((c) => c.ID === id)?.name ?? '—';
  }
}
