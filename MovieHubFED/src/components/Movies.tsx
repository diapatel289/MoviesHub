import { JSX } from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import VerticalPhotoWall from './VerticalPhotoWall';
import { MOVIE_QUERY } from 'assets/Graphql/movieGraphql';
import { useFilter } from '../Contexts/FilterContext';


type MovieData = {
  moviesTitle: {
    value: string;
  };
  gridNumber: {
    value: string;
  };
  direction: {
    value: string;
  }
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
  ott:string;
};

const Movies = (): JSX.Element => {
  
  const { category, year } = useFilter();
  const [StMovieData, setStMovieData] = useState<MovieData | null>(null);
  const [search, setSearch] = useState('');
  const [movies, setmovies] = useState<Movie[]>([]);
  const [page, setpage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const size = 13;
  const totalPages = Math.ceil(totalCount / size);
  const [posters, setPosters] = useState<string[]>([]);
  

  //fetch movies sitecore data
  useEffect(() => {
    const fetchMovieData = async () => {
      const res = await fetch(
        'https://jsstrainingsc.dev.local/sitecore/api/graph/edge?sc_apikey=DD2F7425-8F34-472D-A3E9-B18DED8F6BB0',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: MOVIE_QUERY,
          }),
        }
      );

      const json = await res.json();
      console.log('by', json);
      setStMovieData(json?.data?.item);
    };

    fetchMovieData();
  }, []);

  const fetchMovies = async () => {
    try {
      console.log(page);

      const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        categoryName: category,
        year: year.toString(),
        search: search,
      });

      console.log(queryParams.forEach((e) => console.log(e)));
      const res = await fetch(`https://localhost:7107/api/paginated?${queryParams.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      console.log(data);
      setmovies(data.movies);
      setTotalCount(data.totalCount);
      setPosters(data.latestPosters);
     
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page, size, category, year, search]);

  const handleNext = () => setpage((prev) => prev + 1);
  const handlePrev = () => setpage((prev) => Math.max(0, prev - 1));

  return (
    <div className="sm:w-full">
      <VerticalPhotoWall posters={posters} direction={StMovieData?.direction?.value ?? 'Horizontal'} />

      {/* //Search input  */}

      <div className="flex items-center justify-center bg-black">
        <div className="w-[500px] h-[50px] flex items-center justify-center bg-gradient-to-b  from-[#a291c4] to-[#d1adad] rounded-full overflow-hidden cursor-pointer shadow-[2px_2px_10px_rgba(0,0,0,0.075)]">
          <input
            placeholder="Search Movie.."
            id="input"
            name="text"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[485px] h-[40px] border-none outline-none bg-white rounded-full pl-4 tracking-wide text-[13.4px] text-black caret-[#ff5100] placeholder-black"
          />
        </div>
      </div>
      {/* //end Search */}

      <div className="bg-[#000000] pb-32">
        <div className="p-9  font-bold text-4xl text-white 2xl:pl-52 2xl:pr-52 xl:px-32">
          {StMovieData?.moviesTitle?.value}
        </div>

        <div
          className={`grid grid-cols-${StMovieData?.gridNumber?.value} gap-4 px-[10px]  items-center justify-center
         2xl:grid-cols-6 2xl:px-52 
         xl:grid-cols-4 xl:px-24 
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

export default Movies;
