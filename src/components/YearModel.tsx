import { Field, withDatasourceCheck, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { JSX, useState } from 'react';
import { postWithToast } from './Apitoast';

type YearModelProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    InputField: Field<string>;
    CtaName: Field<string>;
    CtaLink: LinkField;
  };
};

const YearModel = (props: YearModelProps): JSX.Element => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postWithToast(
      'https://localhost:7107/api/metadata/add-year',
      { year: parseInt(inputValue) }, // Make sure it's a number
      'Year added successfully'
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold">{props.fields.Title?.value}</h1>
            <form onSubmit={handleSubmit}>
              <div className="py-8 space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter value"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                  />
                  <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                    {props.fields.InputField?.value || 'Enter value'}
                  </label>
                </div>
                <div className="relative">
                  <button type="submit" className="bg-cyan-500 text-white rounded-md px-2 py-1">
                    {props.fields.CtaName?.value || 'Submit'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withDatasourceCheck()<YearModelProps>(YearModel);
