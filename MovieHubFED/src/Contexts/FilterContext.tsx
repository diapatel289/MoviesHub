// FilterContext.tsx

import { createContext, useContext, useState, ReactNode } from 'react';

interface FilterContextType {
  category: string;
  year: number;
  setCategory: (value: string) => void;
  setYear: (value: number) => void;
}

// ✅ Create context properly
const FilterContext = createContext<FilterContextType>({
  category: '',
  year: 0,
  setCategory: () => {},
  setYear: () => {},
});

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useState('');
  const [year, setYear] = useState(0);

  return (
    // ✅ Use the actual context variable here
    <FilterContext.Provider value={{ category, year, setCategory, setYear }}>
      {children}
    </FilterContext.Provider>
  );
};

// ✅ Export context usage hook
export const useFilter = () => useContext(FilterContext);
