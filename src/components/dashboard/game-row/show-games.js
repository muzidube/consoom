import { useEffect, useState } from 'react';
import axios from 'axios';
import Game from './Game';

export default function ShowGames() {
  const [popularGames, setPopularGames] = useState([]);
  const [latestGames, setLatestGames] = useState([]);
  const [topRatedGamesYear, setTopRatedGamesYear] = useState([]);
  const [topRatedGamesEver, setTopRatedGamesEver] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastWeek = new Date(new Date().valueOf() - 1000 * 3600 * 24 * 7)
      .toISOString()
      .split('T')[0];
    const lastMonth = new Date(new Date().valueOf() - 1000 * 3600 * 24 * 30)
      .toISOString()
      .split('T')[0];
    const lastYear = new Date(new Date().valueOf() - 1000 * 3600 * 24 * 365)
      .toISOString()
      .split('T')[0];

    const fetchPopularGames = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=335197e656a04bad8a99a8fef21b98b7&dates=${lastMonth},${today}&ordering=-ratings_count`
        );
        const json = await (await response).json();
        setPopularGames(json.results);
        setGames(json.results);
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    const fetchLatestGames = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=335197e656a04bad8a99a8fef21b98b7&dates=${lastWeek},${today}&ordering=-released`
        );
        const json = await (await response).json();
        setLatestGames(json.results);
        console.log('Latest Games: ', json.results);
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    const fetchTopRatedGamesYear = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=335197e656a04bad8a99a8fef21b98b7&dates=${lastYear},${today}&metacritic=90,100&ordering=-metacritic`
        );
        const json = await (await response).json();
        setTopRatedGamesYear(json.results);
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    const fetchTopRatedGamesEver = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=335197e656a04bad8a99a8fef21b98b7&metacritic=90,100&ordering=-metacritic`
        );
        const json = await (await response).json();
        setTopRatedGamesEver(json.results);
      } catch (error) {
        console.log('Error: ', error);
      }
    };

    fetchPopularGames();
    fetchLatestGames();
    fetchTopRatedGamesYear();
    fetchTopRatedGamesEver();
  }, []);

  return (
    <section className="max-w-screen-xl flex flex-wrap justify-center items-start content-start w-full box-border bg-cover bg-no-repeat bg-50-50 p-0 text-black text-1rem mx-auto">
      <div className="column-wrapper w-full flex justify-center items-start content-start box-border text-black">
        <div className="content-wrapper px-0 pb-0 mb-0 box-border text-black max-w-screen-xl w-full flex flex-wrap items-start content-start pt-7">
          <div className="column w-full box-border text-black text-1em font-semibold p-0 box-border text-black">
            <div className="column-header px-10 flex flex-wrap justify-start items-center content-center box-border text-black">
              <h2 className="m-0 mr-5 whitespace-nowrap text-1.5em">Games</h2>
              <div className="selector-wrap box-border text-black">
                <div className="selector flex justify-start items-stretch content-center border rounded-3xl border-red-primary box-border text-black">
                  <div className="anchor relative top-0 left-0 z-1 box-border text-black">
                    <h3 className="m-0 inline-flex content-center items-center justify-center text-1em py-1 px-5 whitespace-nowrap font-semibold">
                      <button
                        type="button"
                        className="no_click text-red-primary font-semibold decoration-none box-border bg-transparent"
                        onClick={() => setGames(popularGames)}
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
                        onClick={() => setGames(latestGames)}
                      >
                        Latest
                      </button>
                    </h3>
                  </div>
                  <div className="anchor relative top-0 left-0 z-1 box-border text-black">
                    <h3 className="m-0 inline-flex content-center items-center justify-center text-1em py-1 px-5 whitespace-nowrap font-semibold">
                      <button
                        type="button"
                        className="no_click text-red-primary font-semibold decoration-none box-border bg-transparent"
                        onClick={() => setGames(topRatedGamesYear)}
                      >
                        Top Rated Last Year
                      </button>
                    </h3>
                  </div>
                  <div className="anchor relative top-0 left-0 z-1 box-border text-black">
                    <h3 className="m-0 inline-flex content-center items-center justify-center text-1em py-1 px-5 whitespace-nowrap font-semibold">
                      <button
                        type="button"
                        className="no_click text-red-primary font-semibold decoration-none box-border bg-transparent"
                        onClick={() => setGames(topRatedGamesEver)}
                      >
                        Top Rated All Time
                      </button>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="games-container container max-w-screen-xl w-full flex justify-center flex-wrap items-start content-start mx-auto">
                <div className="media-inner-container h-auto w-full  overflow-x-scroll overflow-y-hidden flex justify-start items-start content-start whitespace-nowrap py-5">
                  {games.length > 0 && games.map((games) => <Game key={games.id} {...games} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
