// /pages/movies/[id].tsx
import Header from 'components/Header';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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

const MovieDetail = () => {
  const { id } = useRouter().query;
  const [movies, setmovies] = useState<Movie>();

  const fetchMovies = async () => {
    if (!id) return;
    try {
      const res = await fetch(`https://localhost:7107/api/movie/${id}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      console.log(data);
      setmovies(data.movie);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [id]);

  return (
    <div className="bg-black">
      <Header />
      <div className="text-white px-12 2xl:px-56 2xl:pt-6 xl:px-28 xl:pt-4 lg:px-20 lg:pt-4">
        <div className="flex-col  gap-12 lg:flex lg:flex-row lg:items-center sm:flex-col sm:items-center  xl:flex xl:flex-row xl:items-center 2xl:flex-row ">
          <div className="w-[90%] 2xl:pt-16 xl:pt-4 sm:w-[100%] ">
            <div className="pt-14 xl:text-3xl">
              {movies?.name} | {movies?.years} | {movies?.format} | {movies?.qualities}
            </div>
            <div className="pt-6 xl:text-xl lg:text-sm">{movies?.tagline} ! !</div>
            <div className="xl:pt-6 xl:text-lg lg:text-[10px] lg:pt-4">{movies?.summary}</div>
          </div>
          <div className="xl:pt-12 sm:flex sm:items-center sm:justify-center">
            <img
              src={movies?.posterImageBase64}
              alt=""
              className="w-[500px] rounded-xl shadow-lg shadow-cyan-500 sm:mt-12"
            />
          </div>
        </div>

        {/* second flex */}
        <div className="flex gap-24 lg:pt-24 sm:pt-24 ">
          <div>
            <div className=" xl:pt-1 xl:text-lg text-emerald-300">Movie Details -</div>
            <div className=" xl:pt-1 xl:text-lg">IMDB Rating - {movies?.imDbRating} / 10</div>
            <div className="xl:pt-1 xl:text-lg">Realease Year - {movies?.years}</div>
            <div className="xl:pt-1 xl:text-lg">Language - {movies?.audios}</div>
            <div className="xl:pt-1 xl:text-lg">Format - {movies?.format}</div>
            <div className="xl:pt-1 xl:text-lg">Format - {movies?.format}</div>
            <div className="xl:pt-1 xl:text-lg">RunTime - {movies?.runtime}</div>
            <div className="xl:pt-1 xl:text-lg">Quality - {movies?.qualities}</div>
            <div className="xl:pt-1 xl:text-lg">originalLanguage - {movies?.originalLanguage}</div>
            <div className="xl:pt-1 xl:text-lg">Genre - {movies?.genres}</div>
          </div>

          <div className="2xl:pt-1 xl:text-lg text-emerald-300">
            Cast -
            {movies?.castCrews.map((cast) => (
              <div className="text-white xl:pt-1">
                {cast.name} - {cast.role}
              </div>
            ))}
          </div>
        </div>

        <div className="xl:pt-16 text-emerald-300 ">
          <div className="xl:pb-8 text-xl sm:pb-8">ScreenShots - </div>
          {movies?.screenshotBase64s.map((ss) => (
            <div className="flex justify-center items-center xl:pb-16 sm:pb-16">
              <img src={ss} className="w-[60%] "></img>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center items-center pb-7">
          <div className="text-2xl">Download yor favroute Movie/Series</div>
          <div className="bg-emerald-900 rounded-lg 2xl:px-8 2xl:py-2 mt-7 xl:px-8 xl:py-2 lg:px-8 lg:py-2 sm:px-8 sm:py-2">
            <a href={movies?.downLoadLink}>DownLoad</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
