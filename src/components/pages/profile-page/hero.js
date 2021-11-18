export default function ProfileHero() {
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
          </div>
        </div>
      </div>
    </section>
  );
}
