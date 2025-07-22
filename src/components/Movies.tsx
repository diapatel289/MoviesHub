import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { JSX } from 'react';
import { useState, useEffect } from 'react';
import router, { useRouter } from 'next/router';
import Link from 'next/link';
import VerticalPhotoWall from './VerticalPhotoWall';

type MoviesProps = ComponentProps & {
  fields: {
    MoviesTitle: Field<string>;
    GridNumber: Field<string>;
  };
};

type CastCrew = {
  name: string;
  role: string;
};

export type Movie = {
  id: number;
  name: string;
  summary: string;
  format: string;
  tagline: string;
  imDbRating: string;
  runtime: string;
  originalLanguage: string;
  genres: string;
  downLoadLink: string;
  categories: string[];
  qualities: string[];
  audios: string[];
  years: string[];
  castCrews: CastCrew[];
  posterImageBase64: string;
  screenshotBase64s: string[];
};

const Movies = (props: MoviesProps): JSX.Element => {
  const [movies, setmovies] = useState<Movie[]>([]);
  const [page, setpage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const size = 10;
  const totalPages = Math.ceil(totalCount / size);

  const fetchMovies = async () => {
    try {
      const res = await fetch(`https://localhost:7107/api/paginated?page=${page}&size=${size}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      console.log(data);
      setmovies(data.movies);
      setTotalCount(data.totalCount);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const handleNext = () => setpage((prev) => prev + 1);
  const handlePrev = () => setpage((prev) => Math.max(0, prev - 1));

  return (
    <div>
      <VerticalPhotoWall movies={movies} />
      <div className="bg-[#000000] pb-32">
      <div className="p-9  font-bold text-4xl text-white 2xl:pl-52 2xl:pr-52 ">
        {props.fields.MoviesTitle?.value}
      </div>

      <div
        className={`grid grid-cols-${props.fields.GridNumber?.value} gap-4 px-[10px]  items-center justify-center
         2xl:grid-cols-6 2xl:px-52 
         xl:grid-cols-5 
         lg:grid-cols-4 
         sm:grid-cols-3 sm:px-[10px] ] `}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="relative group w-fit mx-auto">
            <Link href={`movies/${movie.id}`} className="block">
              <div className="flex flex-col items-center justify-center text-white">
                <img
                  src={movie.posterImageBase64}
                  alt={movie.name}
                  className="object-cover rounded-2xl w-[210px] h-[301px] "
                />
                <div className="mt-2 text-center text-lg font-semibold">{movie.name}</div>
                <div className="absolute bg-cyan-900 text-white rounded-lg px-2 py-1 bottom-12 right-[23px] sm:right-[20px] xl:right-[10px] 2xl:right-[10px]">
                  ⭐ {movie.imDbRating}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-8 gap-4 text-white">
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className="bg-emerald-900 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {page + 1} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={page + 1 >= totalPages}
          className="bg-emerald-900 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default withDatasourceCheck()<MoviesProps>(Movies);
