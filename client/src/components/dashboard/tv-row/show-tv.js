import { useEffect, useState } from 'react';
import TV from './TV';

export default function ShowTV() {
  const [popularTV, setPopularTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [tv, setTV] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchPopularTV = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tvAPI/popular`, {
          signal: abortController.signal
        });
        const json = await response.json();
        const jsonObj = JSON.parse(json);
        setTV(jsonObj);
        setPopularTV(jsonObj);
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    const fetchTopRatedTV = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tvAPI/top-rated`);
        const json = await response.json();
        const jsonObj = JSON.parse(json);
        setTopRatedTV(jsonObj);
      } catch (error) {
        console.log('Error: ', error);
      }
    };

    fetchPopularTV();
    fetchTopRatedTV();

    return () => {
      abortController.abort();
      // stop the query by aborting on the AbortController on unmount
    };
  }, []);

  return (
    <section className="max-w-screen-xl flex flex-wrap justify-center items-start content-start w-full box-border bg-cover bg-no-repeat bg-50-50 p-0 text-black text-1rem mx-auto">
      <div className="column-wrapper w-full flex justify-center items-start content-start box-border text-black">
        <div className="content-wrapper px-0 pb-0 mb-0 box-border text-black max-w-screen-xl w-full flex flex-wrap items-start content-start pt-7">
          <div className="column w-full box-border text-black text-1em font-semibold p-0 box-border text-black">
            <div className="column-header px-10 flex flex-wrap justify-start items-center content-center box-border text-black">
              <h2 className="m-0 mr-5 whitespace-nowrap text-1.5em">TV Shows</h2>
              <div className="selector-wrap box-border text-black py-1.5">
                <div className="selector flex justify-start items-stretch content-center border rounded-3xl border-red-primary box-border text-black">
                  <div className="anchor relative top-0 left-0 z-1 box-border text-black">
                    <h3 className="m-0 inline-flex content-center items-center justify-center text-1em py-1 px-5 whitespace-nowrap font-semibold">
                      <button
                        type="button"
                        className="no_click text-red-primary font-semibold decoration-none box-border bg-transparent"
                        onClick={() => setTV(popularTV)}
                      >
                        Popular
                      </button>
                    </h3>
                  </div>
                  <div className="anchor relative top-0 left-0 z-1 box-border text-black">
                    <h3 className="m-0 inline-flex content-center items-center justify-center text-1em py-1 px-5 whitespace-nowrap font-semibold">
                      <button
                        type="button"
                        className="no_click text-red-primary font-semibold decoration-none box-border bg-transparent"
                        onClick={() => setTV(topRatedTV)}
                      >
                        Top Recent
                      </button>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="tv-container container max-w-screen-xl w-full flex justify-center flex-wrap items-start content-start mx-auto">
                <div className="media-inner-container h-auto w-full  overflow-x-scroll overflow-y-hidden flex justify-start items-start content-start whitespace-nowrap py-5">
                  {tv.length > 0 && tv.map((tv) => <TV key={tv.id} {...tv} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
