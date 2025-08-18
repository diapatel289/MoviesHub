import React from 'react';

interface Props {
  posters: string[];
  direction: string;
}

const VerticalPhotoWall: React.FC<Props> = ({ posters, direction }) => {
  if (direction.toLowerCase() === 'horizontal') {
   
    return (
      <div className="overflow-hidden whitespace-nowrap relative w-full bg-black py-20">
        <div className="flex animate-scroll">
          {posters.map((poster, index) => (
            <img
              key={index}
              src={poster}
              alt={`Poster ${index + 1}`}
              className="h-[300px] w-[300px] inline-block mx-6 rounded-2xl"
            />
          ))}
        </div>
      </div>
    );
  }

  
  const columns = [[], [], []] as string[][];
  posters.forEach((poster, index) => {
    columns[index % 3].push(poster);
  });

  const padding = ['0', '100px']; 

  return (
    <div className="overflow-hidden relative w-full bg-black my-12 h-[600px] ">
      <div className="flex justify-center gap-10 h-full">
        {columns.map((column, colIndex) => (
          <div
            key={colIndex}
            className="flex flex-col gap-6 animate-scrollY"
            style={{ paddingTop: padding[colIndex] }}
          >
            {column.map((poster, idx) => (
              <img
                key={`${colIndex}-${idx}`}
                src={poster}
                alt={`Poster ${idx + 1}`}
                className="h-[350px] w-[250px] object-cover rounded-2xl"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalPhotoWall;
