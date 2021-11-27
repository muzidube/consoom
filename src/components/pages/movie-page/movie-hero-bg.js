export default async function movieHeroBG(id) {
  const response = await fetch(`/api/movieAPI/single/${id}`);
  const json = await response.json();
  const jsonObj = JSON.parse(json);
  const bg = jsonObj.backdrop_path;

  if (document.querySelector('.movie-page-hero')) {
    document.querySelector('.movie-page-hero').style.backgroundImage = `url(
    https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${bg}`;
  }
}
