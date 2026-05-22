import { Link } from "react-router-dom";

import { useMovieStore } from "../../../store/useMovieStore";

export default function FilmIndex() {

  const movies = useMovieStore(
    (state: any) => state.movies
  );

  const removeMovie = useMovieStore(
    (state: any) => state.removeMovie
  );

  return (
    <div className="bg-black text-white min-h-screen p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Movies
        </h1>

        <Link
            to="/dashboard/filmnetflix/create"
            className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
          >
            + Tambah Film
          </Link>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {movies.length > 0 ? (

          movies.map((movie: any) => (

            <div
              key={movie.id}
              className="bg-zinc-900 rounded-lg overflow-hidden"
            >

              <img
                src={movie.foto}
                alt={movie.name}
                className="w-full h-72 object-cover"
              />

              <div className="p-4">

                <h2 className="text-lg font-semibold">
                  {movie.name}
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  {movie.role}
                </p>

                <button
                  onClick={() =>
                    removeMovie(movie.id)
                  }
                  className="bg-red-600 px-3 py-1 rounded mt-3 hover:bg-red-700"
                >
                  Hapus
                </button>

              </div>

            </div>

          ))

        ) : (

          <p className="text-gray-400">
            Belum ada film
          </p>

        )}

      </div>

    </div>
  );
}