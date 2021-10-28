export async function heroSearchBG() {
  let bgArray;

  await fetch(
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0375f153b709c9b683ba71849a873283&page=1'
  )
    .then((res) => res.json())
    .then((data) => {
      bgArray = data.results.map((a) => a.backdrop_path);
    });

  const selectBG = await bgArray[Math.floor(Math.random() * bgArray.length)];

  document.querySelector(
    '.hero'
  ).style.backgroundImage = `linear-gradient(to right, rgba(248, 118, 102, 1), rgba(248, 118, 102, 0.3)), url(
  https://image.tmdb.org/t/p/w1280${selectBG}`;
}
