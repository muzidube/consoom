import PropTypes from 'prop-types';
import { heroSearchBG } from '../../modules/heroSearchBG';

export default function HeroSearch() {
  heroSearchBG();
  return (
    <section className="hero max-w-screen-xl min-h-300px h-heroHeight max-h-360px bg-top-center bg-cover bg-no-repeat text-white flex flex-wrap justify-center items-start content-start w-full box-border mx-auto">
      <div className="media discover h-full flex content-center items-center justify-center w-full flex-wrap box-border text-white">
        <div className="w-full flex justify-center content-start items-start box-border text-white">
          <div className="content-wrapper flex-wrap max-w-screen-xl w-full flex items-start content-start px-10 py-7 box-border text-white">
            <div className="title w-full mb-1.25 box-border text-white">
              <h2 className="text-3em font-bold leading-none w-full m-0 p-0 box-border text-white">
                Welcome
              </h2>
              <h3 className="text-2em font-semibold m-0 p-0 box-border text-white">
                Movies, TV Shows, Books and Games... What are you waiting for? Consume now.
              </h3>
            </div>
            <div className="search max-w-screen-xl w-full box-border text-white">
              <form className="mt-7 relative top-0 left-0 box-border text-white">
                <label className="box-border text-white" htmlFor="search">
                  <input
                    className="search w-full h-11 leading-10 text-1.1em text-black border-none rounded-3xl px-5 py-2.5 box-border"
                    dir="auto"
                    name="query"
                    type="text"
                    // tabIndex="1"
                    autoCorrect="on"
                    autoComplete="on"
                    spellCheck="false"
                    placeholder="Search for a movie, tv show, book or game..."
                    value=""
                  />
                </label>
                <input
                  className="inline-flex justify-center align-center content-center h-11 py-2.5 px-6 border-none bg-red-primary rounded-3xl absolute top-0 -right-px text-white font-bold cursor-pointer leading-normal"
                  type="submit"
                  value="Search"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
