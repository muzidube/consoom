export default async function TVHeroBG(id) {
  const response = await fetch(`/api/tvAPI/single/${id}`);
  const json = await response.json();
  const jsonObj = JSON.parse(json);
  const bg = jsonObj.backdrop_path;

  if (document.querySelector('.tv-page-hero')) {
    document.querySelector('.tv-page-hero').style.backgroundImage = `url(
      https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${bg}`;
  }
}
