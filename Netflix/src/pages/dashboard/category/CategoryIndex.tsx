import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCategoryStore } from "../../../store/useCategoryStore";

export default function CategoryIndex() {

  const categories = useCategoryStore(
    (state: any) => state.categories
  ) || [];

  const setCategories = useCategoryStore(
    (state: any) => state.setCategories
  );

  const removeCategory = useCategoryStore(
    (state: any) => state.removeCategory
  );

  // FETCH DATA CATEGORY
  useEffect(() => {

    const fetchCategories = async () => {

      try {

        const response = await fetch(
          "http://localhost:3000/categories"
        );

        const data = await response.json();

        setCategories(data);

      } catch (error) {

        console.log("Gagal fetch category", error);

      }

    };

    fetchCategories();

  }, []);

  return (
    <div className="bg-black text-white min-h-screen p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Category
        </h1>

        <Link
          to="/dashboard/category/create"
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
        >
          + Tambah
        </Link>

      </div>

      <div className="space-y-4">

        {categories.length > 0 ? (

          categories.map((category: any, index: number) => (

            <div
              key={index}
              className="bg-zinc-900 p-4 rounded-lg flex justify-between items-center"
            >

              <h2 className="text-lg">
                {category.name}
              </h2>

              <button
                onClick={() => removeCategory(category.id)}
                className="bg-red-600 px-4 py-1 rounded hover:bg-red-700"
              >
                Hapus
              </button>

            </div>

          ))

        ) : (

          <p className="text-gray-400">
            Belum ada category
          </p>

        )}

      </div>

    </div>
  );
}