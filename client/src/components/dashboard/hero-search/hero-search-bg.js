export default async function heroSearchBG() {
  let bgArray;

  await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/movieAPI/popular`)
    .then((res) => res.json())
    .then((res) => JSON.parse(res))
    .then((data) => {
      bgArray = data.map((a) => a.backdrop_path);
    });

  const selectBG = await bgArray[Math.floor(Math.random() * bgArray.length)];

  if (document.querySelector('.hero')) {
    document.querySelector(
      '.hero'
    ).style.backgroundImage = `linear-gradient(to right, rgba(248, 118, 102, 1), rgba(248, 118, 102, 0.3)), url(
  https://image.tmdb.org/t/p/w1920_and_h600_multi_faces${selectBG}`;
  }
}
