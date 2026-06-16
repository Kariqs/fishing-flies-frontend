import { Categories } from '../components/admin/categories/categories';

export interface Category {
  ID: number;
  name: string;
  description?: string;
}

export type CreateCategoryRequest = {
  name: string;
  description: string;
};

export type CreateCategoryResponse = {
  message: string;
  category?: Category;
};

export type GetCategoriesResponse = {
  categories: Category[];
};
