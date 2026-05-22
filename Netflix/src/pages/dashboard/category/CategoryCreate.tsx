import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCategoryStore } from "../../../store/useCategoryStore";

export default function CategoryCreate() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const addCategory = useCategoryStore((state: any) => state.addCategory);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!name) {
      alert("Nama category wajib diisi!");
      return;
    }

    addCategory(name); 
    alert("Category berhasil ditambahkan!");
    navigate("/dashboard/category");
  };

  return (
    
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-3xl font-bold mb-8">
        Tambah Category
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-6 rounded-lg max-w-md"
      >

        <div className="mb-5">

          <label className="block mb-2">
            Nama Category
          </label>

          <input
            type="text"
            placeholder="Contoh: Horror"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 outline-none"
          />

        </div>

        <div className="flex gap-3">

          <button
            type="submit"
            className="bg-red-600 px-5 py-2 rounded hover:bg-red-700"
          >
            Simpan
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard/category")
            }
            className="bg-gray-700 px-5 py-2 rounded"
          >
            Batal
          </button>

        </div>

      </form>

    </div>
  );
}