import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { JSX, useEffect, useState } from 'react';
import { Movie } from './Movies';

type MoviePlateformProps = ComponentProps & {
  fields: {
    Title: Field<string>;
  };
};

const MoviePlateform = (props: MoviePlateformProps): JSX.Element => {
  const [movies, setmovies] = useState<Movie[]>([]);
  const [page, setpage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [netflixMovies, setNetflixMovies] = useState<Movie[]>([]);
  const [amazonMovies, setAmazonMovies] = useState<Movie[]>([]);
  const [hotstarMovies, setHotstarMovies] = useState<Movie[]>([]);
  const [sonyMovies, setSonyMovies] = useState<Movie[]>([]);
  const size = totalCount;
  const totalPages = Math.ceil(totalCount / size);

  const fetchMovies = async () => {
    try {
      console.log(page);

      const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });

      console.log(queryParams.forEach((e) => console.log(e)));
      const res = await fetch(`https://localhost:7107/api/paginated?${queryParams.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      console.log(data);
      setmovies(data.movies);
      setTotalCount(data.totalCount);

      setNetflixMovies(movies.filter((m) => m.ott === 'Netflix'));
      setAmazonMovies(movies.filter((m) => m.ott === 'Amazon Prime'));
      setHotstarMovies(movies.filter((m) => m.ott === 'Jio Hotstar'));
      setSonyMovies(movies.filter((m) => m.ott === 'Sony Live'));
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page, size]);

  return (
    <div className="bg-black">
      <div className="xl:px-48 xl:pt-20">
        <div className="text-white text-3xl">{props.fields.Title.value}</div>
      </div>
    </div>
  );
};

export default withDatasourceCheck()<MoviePlateformProps>(MoviePlateform);
