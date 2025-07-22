import {
  Text,
  Field,
  withDatasourceCheck,
  ImageField,
  LinkField,
  Link,
} from '@sitecore-jss/sitecore-jss-nextjs';

import { ComponentProps } from 'lib/component-props';
import { JSX, useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import jwt_decode_, { JwtPayload } from 'jwt-decode';
import router from 'next/router';
const jwt_decode = require('jwt-decode') as (token: string) => JwtPayload & { role: string };

type Category = {
  id: number;
  name: string;
};

type Year = {
  id: number;
  year: number;
};

type HeaderProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    Logo: ImageField;
    Home: Field<string>;
    About: Field<string>;
    Category: Field<string>;
    Year: Field<string>;
    AddMovie: Field<string>;
    HomeLink: LinkField;
    AboutLink: LinkField;
    AddMovieLink: LinkField;
  };
};

const Header = (props: HeaderProps): JSX.Element => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [years, setYears] = useState<Year[]>([]);
  const [open, setOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const { token, logout, role } = useAuth();
  const addOptions = ['Add Movie', 'Add Category', 'Add Year', 'Add Audio', 'Add Quality'];

  console.log('hii', token);
  // Decode token and check if user is admin
  useEffect(() => {
    if (role) {
      setIsAdmin(role.toLowerCase() === 'admin');
    }
  }, [role]);

  // Fetch category and year filters
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch('https://localhost:7107/api/metadata/get-drop');
        if (!response.ok) throw new Error('Failed to fetch filters');

        const data = await response.json();
        console.log(data)
        setCategories(data.categories || []);
        setYears(data.years || []);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };

    fetchFilters();
  }, []);

  return (
    <header className="bg-white shadow-md w-2xl">
      <div className="w-auto flex items-center justify-between px-12.5">
        {/* Logo */}
        <Link field={props.fields.HomeLink} className='flex items-center '>
          <img src={props.fields.Logo?.value?.src} alt="Logo" className="size-24 w-24" />
          <p className='text-2xl font-semibold'>MoviesHub</p>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link
            field={props.fields.HomeLink}
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            <Text field={props.fields.Home} />
          </Link>

          <Link
            field={props.fields.AboutLink}
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            <Text field={props.fields.About} />
          </Link>

          {/* Category Dropdown */}
          <div
            className="relative inline-block"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <div className="cursor-pointer text-gray-700 font-medium">
              <Text field={props.fields.Category} />
            </div>

            {open && (
              <div className="absolute left-0 top-full bg-white border rounded-md shadow-lg z-50 flex flex-col min-w-[10rem]">
                {categories.map((category) => (
                  <a
                    key={category.id}
                    href={`/category/${encodeURIComponent(category.name)}`}
                    className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
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
            <div className="cursor-pointer text-gray-700 font-medium hover:text-indigo-600">
              <Text field={props.fields.Year} />
            </div>

            {yearOpen && (
              <div className="absolute left-0 top-full bg-white border rounded-md shadow-lg z-50 flex flex-col min-w-[8rem]">
                {years.map((year) => (
                  <a
                    key={year.id}
                    href={`/year/${encodeURIComponent(year.year)}`}
                    className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    {year.year}
                  </a>
                ))}
              </div>
            )}
          </div>
          {isAdmin && (<div
            className="relative inline-block"
            onMouseEnter={() => setAddOpen(true)}
            onMouseLeave={() => setAddOpen(false)}
          >
            <div className="cursor-pointer text-gray-700 font-medium hover:text-indigo-600">
              Add
            </div>

            {addOpen && (
              <div className="absolute left-0 top-full bg-white border rounded-md shadow-lg z-50 flex flex-col min-w-[10rem]">
                {addOptions.map((option, i) => {
                  const route = `/movies/${option.toLowerCase().replace(/\s+/g, '-')}`;
                  return (
                    <a
                      key={i}
                      href={route}
                      className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    >
                      {option}
                    </a>
                  );
                })}
              </div>
            )}
          </div>)}

        

          <button
            onClick={() => {
              logout(); // Clear token from context
              router.push('/login'); // Redirect to login
            }}
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default withDatasourceCheck()<HeaderProps>(Header);
