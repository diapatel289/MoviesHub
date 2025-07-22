import React from 'react';
import type { Movie } from '../components/Movies';

interface Props {
  movies: Movie[];
}

const VerticalPhotoWall: React.FC<Props> = ({ movies }) => {
  

  return (
    <div className="overflow-hidden whitespace-nowrap relative w-full bg-black py-20">
      {/* Animated Track */}
      <div className="flex animate-scroll">
        {movies.map((logo, idx) => (
          <img
            key={idx}
            src={logo.posterImageBase64}
            alt={`Logo ${idx}`}
            className="h-[300px] w-[300px] inline-block mx-6 rounded-2xl"
          />
        ))}
      </div>
    </div>
  );
};

export default VerticalPhotoWall;
