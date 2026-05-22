import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Category {
  id: number;
  name: string;
}

interface CategoryState {

  categories: Category[];

  setCategories: (data: Category[]) => void;

  addCategory: (category: Category) => void;

  removeCategory: (id: number) => void;

}

export const useCategoryStore =
  create<CategoryState>()(
    persist(
      (set) => ({

        categories: [],

        setCategories: (data) =>
          set({
            categories: data,
          }),

        addCategory: (category) =>
          set((state) => ({
            categories: [
              ...state.categories,
              category,
            ],
          })),

        removeCategory: (id) =>
          set((state) => ({
            categories:
              state.categories.filter(
                (cat) => cat.id !== id
              ),
          })),

      }),
      {
        name: "category-storage",
      }
    )
  );