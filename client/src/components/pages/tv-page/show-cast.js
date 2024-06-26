import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cast from './cast';

export default function ShowCast() {
  const { id } = useParams();

  const [cast, setCast] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchCast = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tvAPI/cast/${id}`, {
          signal: abortController.signal
        });
        const json = await response.json();
        const jsonObj = JSON.parse(json);
        setCast(jsonObj);
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    fetchCast();

    return () => {
      abortController.abort();
      // stop the query by aborting on the AbortController on unmount
    };
  }, [id]);

  return (
    <section className="max-w-screen-xl flex flex-wrap justify-center items-start content-start w-full box-border bg-cover bg-no-repeat bg-50-50 p-0 text-black text-1rem mx-auto">
      <div className="column-wrapper w-full flex justify-center items-start content-start box-border text-black">
        <div className="content-wrapper px-0 pb-0 mb-0 box-border text-black max-w-screen-xl w-full flex flex-wrap items-start content-start pt-7">
          <div className="column w-full box-border text-black text-1em font-semibold p-0 box-border text-black">
            <div className="column-header px-10 flex flex-wrap justify-start items-center content-center box-border text-black">
              <h2 className="m-0 mr-5 whitespace-nowrap text-1.5em">Cast</h2>
              <div className="movie-container container max-w-screen-xl w-full flex justify-center flex-wrap items-start content-start mx-auto">
                <div className="media-inner-container h-auto w-full overflow-x-scroll overflow-y-hidden flex justify-start items-start content-start whitespace-nowrap py-5">
                  {cast.length > 0 && cast.map((cast) => <Cast key={cast.id} {...cast} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
