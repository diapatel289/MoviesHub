import { JSX, useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import router from 'next/router';
import { HEADER_QUERY } from 'assets/Graphql/headerGraphql';
import { useFilter } from '../Contexts/FilterContext';

type Category = {
  id: number;
  name: string;
  SetFilterCat: (value: string) => void;
};

type Year = {
  id: number;
  year: number;
  SetFilterYear: (value: string) => void;
};

type HeaderData = {
  logo: {
    src: string;
    alt: string;
  };
  home: {
    value: string;
  };
  about: {
    value: string;
  };
  category: {
    value: string;
  };
  year: {
    value: string;
  };
  addMovie: {
    value: string;
  };
  homeLink: {
    text: string;
    url: string;
    target?: string;
  };
  aboutLink: {
    text: string;
    url: string;
    target?: string;
  };
  addMovieLink: {
    text: string;
    url: string;
    target?: string;
  };
};

const Header = (): JSX.Element => {
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [years, setYears] = useState<Year[]>([]);
  const [open, setOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const { setCategory, setYear } = useFilter();

  const { token, logout, role } = useAuth();
  const addOptions = ['Add Movie', 'Add Category', 'Add Year', 'Add Audio', 'Add Quality'];

  console.log('hii', token);
  // Decode token and check if user is admin
  useEffect(() => {
    if (role) {
      setIsAdmin(role.toLowerCase() === 'admin');
    }
  }, [role]);

  //useffect to call grapgql
  useEffect(() => {
    const fetchHeaderData = async () => {
      const res = await fetch(
        'https://jsstrainingsc.dev.local/sitecore/api/graph/edge?sc_apikey=DD2F7425-8F34-472D-A3E9-B18DED8F6BB0',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: HEADER_QUERY,
          }),
        }
      );

      const json = await res.json();
      console.log(json);
      setHeaderData(json?.data?.item);
    };

    fetchHeaderData();
  }, []);

  // Fetch category and year filters
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch('https://localhost:7107/api/metadata/get-drop');
        if (!response.ok) throw new Error('Failed to fetch filters');

        const data = await response.json();
        console.log(data);
        setCategories(data.categories || []);
        setYears(data.years || []);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };

    fetchFilters();
  }, []);

  return (
    <div>
      <header className="bg-[#000000] shadow-md w-2xl pt-4 pb-4 text-white 2xl:pl-32 2xl:pr-32 xl:px-24">
        <div className="w-auto flex items-center justify-between px-12.5">
          {/* Logo */}
          <a href="/movies" className="flex items-center hover:no-underline ">
            {/* <img src={props.fields.Logo?.value?.src} alt="Logo" className="size-24 w-24" /> */}
            <link
              rel="icon"
              type="image/png"
              href="/film-slate.ico"
              className="w-[10px] h-[10px] no-underline"
            />
            <p className="text-2xl font-semibold no-underline">MoviesHub</p>
          </a>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <a href="/movies" className="text-blcak text-xl  font-medium hover:no-underline">
              {headerData?.home?.value}
            </a>

            <a href="/About" className="text-blcak text-xl  font-medium hover:no-underline">
              {headerData?.about?.value}
            </a>
            <a href="/ottmovies" className="text-blcak text-xl  font-medium hover:no-underline">
              New Release
            </a>

            {/* Category Dropdown */}
            <div
              className="relative inline-block"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <div className="cursor-pointer text-blcak text-xl font-medium">
                {headerData?.category?.value}
              </div>

              {open && (
                <div className="absolute left-0 top-full bg-emerald-600 border rounded-md shadow-lg z-50 flex flex-col min-w-[10rem]">
                  {categories.map((category) => (
                    <a
                      key={category.id}
                      className="px-4 py-2 text-sm text-black hover:bg-gray-100"
                      onClick={(e) => {
                        e.preventDefault();
                        setCategory(category.name);
                        setYear(0);
                      }}
                    >
                      {category.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Year Dropdown */}
            <div
              className="relative inline-block"
              onMouseEnter={() => setYearOpen(true)}
              onMouseLeave={() => setYearOpen(false)}
            >
              <div className="cursor-pointer text-blcak text-xl font-medium ">
                {headerData?.year?.value}
              </div>

              {yearOpen && (
                <div className="absolute left-0 top-full bg-emerald-600 border rounded-md shadow-lg z-50 flex flex-col min-w-[8rem]">
                  {years.map((year) => (
                    <a
                      key={year.id}
                      className="px-4 py-2 text-sm text-black hover:bg-gray-100"
                      onClick={(e) => {
                        e.preventDefault();
                        setYear(year.year);
                        setCategory('')
                      }}
                    >
                      {year.year}
                    </a>
                  ))}
                </div>
              )}
            </div>
            {isAdmin && (
              <div
                className="relative inline-block"
                onMouseEnter={() => setAddOpen(true)}
                onMouseLeave={() => setAddOpen(false)}
              >
                <div className="cursor-pointer text-blcak text-xl font-medium ">Add</div>

                {addOpen && (
                  <div className="absolute left-0 top-full bg-emerald-600 border rounded-md shadow-lg z-50 flex flex-col min-w-[10rem] hover:no-underline">
                    {addOptions.map((option, i) => {
                      const route = `/${option.toLowerCase().replace(/\s+/g, '-')}`;
                      return (
                        <a
                          key={i}
                          href={route}
                          className="px-4 py-2 text-sm text-black hover:bg-gray-100 hover:no-underline"
                        >
                          {option}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => {
                logout(); // Clear token from context
                router.push('/login'); // Redirect to login
              }}
              className="text-blcak text-xl hover:text-red-600 font-medium"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
