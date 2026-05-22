import { create } from "zustand";
import { persist } from "zustand/middleware"; 

interface CategoryState {
  categories: string[];
  addCategory: (name: string) => void;
  removeCategory: (name: string) => void;
}

export const useCategoryStore =
  create<CategoryState>()( 
    persist( 
      (set) => ({
        categories: [],

        addCategory: (name) =>
          set((state) => ({
            categories: [
              ...state.categories,
              name, 
            ],
          })),

        removeCategory: (name) =>
          set((state) => ({
            categories:
              state.categories.filter(
                (cat) => cat !== name
              ),
          })),
      }),
      {
        name: "category-storage", 
      }
    )
  );