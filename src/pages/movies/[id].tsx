// /pages/movies/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const MovieDetail = () => {
  const { id } = useRouter().query;
  const [movie, setMovie] = useState(null);

  

 

  return (
    <div className="p-6 max-w-3xl mx-auto">
      hiii
    </div>
  );
};

export default MovieDetail;
