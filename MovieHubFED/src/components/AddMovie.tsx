import {  Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { JSX, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface CastCrew {
  name: string;
  role: string;
}

type AddMovieProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    NameLable: Field<string>;
    ImageLable: Field<string>;
    YearLable: Field<string>;
    SummeryLable: Field<string>;
    FormatLable: Field<string>;
    IMDBLable: Field<string>;
    RuntimeLable: Field<string>;
    OrigionalAudioLable: Field<string>;
    GenresLable: Field<string>;
    CategoryLable: Field<string>;
    AudioLable: Field<string>;
    QualityLable: Field<string>;
    CastAndCrewLable: Field<string>;
    ScreenshotLable: Field<string>;
    TagLineLable: Field<string>;
  };
};

const AddMovie = (props: AddMovieProps): JSX.Element => {
  const [name, setName] = useState('');

  const [format, setFormat] = useState('');
  const [tagline, setTagline] = useState('');
  const [imdbRating, setImdbRating] = useState('');
  const [runtime, setRuntime] = useState('');
  const [originalLanguage, setOriginalLanguage] = useState('');
  const [genres, setGenres] = useState('');
  const [summary, setSummary] = useState('');
  const [downloadLink, setDownloadLink] = useState('');

  const [selectedCategory, setSelectedCategory] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number[]>([]);
  const [selectedAudio, setSelectedAudio] = useState<number[]>([]);
  const [selectedQuality, setSelectedQuality] = useState<number[]>([]);

  //for dropdowns
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [years, setYears] = useState<{ id: number; year: number }[]>([]);
  const [audios, setAudios] = useState<{ id: number; language: string }[]>([]);
  const [qualities, setQualities] = useState<{ id: number; qualityName: string }[]>([]);

  //for movie image and screenshots
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [screenshots, setScreenshots] = useState<File[]>([]);

  //for cat and crew
  const [castCrew, setCastCrew] = useState<CastCrew[]>([{ name: '', role: '' }]);

  //for ott dropdown
   const ottOptions = ['Netflix', 'Amazon Prime', 'Jio Hotstar', 'Sony Live'];
   const [ott,setOtt]=useState('');

  useEffect(() => {
    console.log(screenshots);
    const fetchDropdowns = async () => {
      try {
        const res = await fetch('https://localhost:7107/api/metadata/get-drop'); // your consolidated backend endpoint
        const data = await res.json();

        setCategories(data.categories);
        setYears(data.years);
        setAudios(data.audios);
        setQualities(data.qualities);
      } catch (err) {
        console.error('Error fetching dropdown data:', err);
      }
    };

    fetchDropdowns();
  }, [screenshots]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // Basic fields
    formData.append('Name', name);
    formData.append('Format', format);
    formData.append('Tagline', tagline);
    formData.append('IMDbRating', imdbRating);
    formData.append('Runtime', runtime);
    formData.append('OriginalLanguage', originalLanguage);
    formData.append('Genres', genres);
    formData.append('Summary', summary);
    formData.append('DownLoadLink', downloadLink);
    formData.append('Ott',ott);

    // 🔹 Poster Image (as IFormFile => byte[] in backend)
    if (posterFile) {
      formData.append('Image', posterFile); // must match 'Image' in CreateMovieDto
    }

    // 🔹 Foreign keys (multiple)
    selectedYear.forEach((id) => formData.append('Year', id.toString()));
    selectedCategory.forEach((id) => formData.append('CategoryIds', id.toString()));
    selectedQuality.forEach((id) => formData.append('QualityIds', id.toString()));
    selectedAudio.forEach((id) => formData.append('AudioIds', id.toString()));

    // 🔹 Screenshots (multiple)
    screenshots.forEach((file) => {
      formData.append('Screenshots', file); // DTO accepts List<IFormFile>
    });

    // 🔹 CastCrew list — convert to JSON string before sending
 
    formData.append('CastCrews', JSON.stringify(castCrew)); // matches List<CastCrewDto>
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    try {
      e.preventDefault();

      const response = await fetch('https://localhost:7107/api/addmovie', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Optional: for debugging

        // ✅ Show toast
        toast.success(data.message || 'Movie added successfully');

        // ✅ Reset form fields
        setName('');

        setFormat('');
        setTagline('');
        setImdbRating('');
        setRuntime('');
        setOriginalLanguage('');
        setGenres('');
        setSummary('');
        setDownloadLink('');
        setPosterFile(null);
        setScreenshots([]);
        setSelectedCategory([]);
        setSelectedYear([]);
        setSelectedAudio([]);
        setSelectedQuality([]);
        setCastCrew([{ name: '', role: '' }]);
        setPosterFile(null);
        setScreenshots([]);

        // Optional: scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to add movie');
      }
    } catch (err) {
      console.error('Upload error:', err);
      toast.error('Network or server error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-black py-6 flex flex-col justify-center sm:py-20 ">
      <div className="relative py-3 sm:max-w-5xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900 to-cyan-800 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-6 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="w-full max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center mb-10 text-gray-800">
              {props.fields.Title?.value || 'Add Movie / Series'}
            </h1>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700"
            >
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Movie Name"
                  className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-cyan-600"
                />
                <label htmlFor="name" className="form-label peer-label">
                  {props.fields.NameLable.value}
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="format"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  placeholder="Format"
                  className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-cyan-600"
                />
                <label htmlFor="format" className="form-label peer-label">
                  {props.fields.FormatLable.value}
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Tagline"
                  className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-cyan-600"
                />
                <label htmlFor="tagline" className="form-label peer-label">
                  {props.fields.TagLineLable.value}
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="imdbRating"
                  value={imdbRating}
                  onChange={(e) => setImdbRating(e.target.value)}
                  placeholder="IMDb Rating"
                  className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-cyan-600"
                />
                <label htmlFor="imdbRating" className="form-label peer-label">
                  {props.fields.IMDBLable.value}
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="runtime"
                  value={runtime}
                  onChange={(e) => setRuntime(e.target.value)}
                  placeholder="Runtime"
                  className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-cyan-600"
                />
                <label htmlFor="runtime" className="form-label peer-label">
                  {props.fields.RuntimeLable.value}
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="originalLanguage"
                  value={originalLanguage}
                  onChange={(e) => setOriginalLanguage(e.target.value)}
                  placeholder="Original Language"
                  className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-cyan-600"
                />
                <label htmlFor="originalLanguage" className="form-label peer-label">
                  {props.fields.OrigionalAudioLable.value}
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="genres"
                  value={genres}
                  onChange={(e) => setGenres(e.target.value)}
                  placeholder="Genres"
                  className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-cyan-600"
                />
                <label htmlFor="genres" className="form-label peer-label">
                  {props.fields.GenresLable.value} (comma-separated)
                </label>
              </div>
              <div className="sm:col-span-2 relative">
                <textarea
                  name="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Summary"
                  rows={4}
                  className="peer w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-cyan-600"
                />
                <label htmlFor="summary" className="form-label peer-label">
                  {props.fields.SummeryLable.value}
                </label>
              </div>

              <select
                value={selectedCategory.map(String)} // convert to string array for HTML
                onChange={(e) => {
                  const selectedOptions = Array.from(e.target.selectedOptions).map((option) =>
                    parseInt(option.value)
                  );
                  setSelectedCategory(selectedOptions);
                }}
                className="input"
              >
                <option>{props.fields.CategoryLable.value}</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Year Dropdown */}
              <select
                value={selectedYear.map(String)}
                onChange={(e) =>
                  setSelectedYear(
                    Array.from(e.target.selectedOptions).map((option) => parseInt(option.value))
                  )
                }
                className="input"
              >
                <option>{props.fields.YearLable.value}</option>
                {years.map((year) => (
                  <option key={year.id} value={year.id}>
                    {year.year}
                  </option>
                ))}
              </select>

              {/* Audio Dropdown */}
              <select
                value={selectedAudio.map(String)}
                onChange={(e) =>
                  setSelectedAudio(
                    Array.from(e.target.selectedOptions).map((option) => parseInt(option.value))
                  )
                }
                className="input"
              >
                <option>{props.fields.AudioLable.value}</option>
                {audios.map((audio) => (
                  <option key={audio.id} value={audio.id}>
                    {audio.language}
                  </option>
                ))}
              </select>

              {/* Quality Dropdown */}
              <select
                value={selectedQuality.map(String)}
                onChange={(e) =>
                  setSelectedQuality(
                    Array.from(e.target.selectedOptions).map((option) => parseInt(option.value))
                  )
                }
                className="input"
              >
                <option>{props.fields.QualityLable.value}</option>
                {qualities.map((quality) => (
                  <option key={quality.id} value={quality.id}>
                    {quality.qualityName}
                  </option>
                ))}
              </select>

              {/* //OTT Dropdown */}
              
              <select
                value={ott}
                onChange={(e) =>
                  setOtt(
                    e.target.value
                  )
                }
                className="input"
              >
                <option>Ott</option>
                {ottOptions.map((audio) => (
                  <option  value={audio}>
                    {audio}
                  </option>
                ))}
              </select>

              <div className="sm:col-span-2 relative">
                <label htmlFor="poster" className="block text-sm font-medium text-gray-700 mb-1">
                  {props.fields.ImageLable.value}
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    id="poster"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setPosterFile(e.target.files[0]);
                      }
                    }}
                    className="block w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 relative">
                <label
                  htmlFor="screenshots"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {props.fields.ScreenshotLable.value} (You can select multiple)
                </label>
                <input
                  type="file"
                  id="screenshots"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      const filesArray = Array.from(e.target.files); // convert FileList to File[]
                      setScreenshots(filesArray);
                    }
                  }}
                  className="block w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
                />
              </div>
              {screenshots.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Screenshots:</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {screenshots.map((file, index) => (
                      <div key={index} className="flex flex-col items-center space-y-2">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-24 object-cover rounded-md border border-gray-300"
                        />
                        <p className="text-xs text-gray-600 text-center truncate w-full px-1">
                          {file.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="relative sm:col-span-2">
                <input
                  type="text"
                  name="name"
                  value={downloadLink}
                  onChange={(e) => setDownloadLink(e.target.value)}
                  placeholder="DownloadLink"
                  className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-cyan-600"
                />
                <label htmlFor="name" className="form-label peer-label">
                  Download Link (if this is a series, use the Zip. episodes link)
                </label>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {props.fields.CastAndCrewLable.value || 'Cast & Crew'}
                </label>
                {castCrew.map((member, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 mb-2 items-center">
                    <input
                      type="text"
                      placeholder="Name"
                      value={member.name}
                      onChange={(e) => {
                        const updated = [...castCrew];
                        updated[index].name = e.target.value;
                        setCastCrew(updated);
                      }}
                      className="p-2 border border-gray-300 rounded w-full"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Role (e.g. Actor, Director)"
                      value={member.role}
                      onChange={(e) => {
                        const updated = [...castCrew];
                        updated[index].role = e.target.value;
                        setCastCrew(updated);
                      }}
                      className="p-2 border border-gray-300 rounded w-full"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...castCrew];
                        updated.splice(index, 1);
                        setCastCrew(updated);
                      }}
                      className="bg-cyan-900 text-white px-6 py-2 rounded-lg font-semibold transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setCastCrew([...castCrew, { name: '', role: '' }])}
                  className="bg-cyan-900 text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                  + Add Cast/Crew
                </button>
              </div>

              <div className="sm:col-span-2 text-center mt-4">
                <button
                  type="submit"
                  className="bg-cyan-900 text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                  Add Movie
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withDatasourceCheck()<AddMovieProps>(AddMovie);
