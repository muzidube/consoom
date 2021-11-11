export default async function movieHeroBG(id) {
  let bg;

  await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=0375f153b709c9b683ba71849a873283&language=en-US`
  )
    .then((res) => res.json())
    .then((data) => {
      bg = data.backdrop_path;
    });

  document.querySelector('.hero').style.backgroundImage = `url(
    https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${bg}`;
}