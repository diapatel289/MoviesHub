import { Text, Field, withDatasourceCheck, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { JSX } from 'react';



type HeroBannerProps = ComponentProps & {
  fields: {
    Title:Field<string>;
    Description:Field<string>;
    Image:ImageField;
  };
};




const HeroBanner = (props: HeroBannerProps): JSX.Element => (
  <div>
    <div className='relative bg-cover bg-center sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] h-[500px] w-full flex items-center justify-center  ' style={{backgroundImage:`url(${props.fields.Image?.value?.src})`}}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Content */}
  <div className="relative z-10 text-center ">
    <h1 className="text-5xl font-bold text-blue-300">{props.fields.Title?.value}</h1>
    <div className='w-[400px]'>
      <p className="text-2xl mt-2  text-blue-300">{props.fields.Description?.value}</p>
    </div>
  </div>
    </div>
    
    
  </div>
);

export default withDatasourceCheck()<HeroBannerProps>(HeroBanner);
