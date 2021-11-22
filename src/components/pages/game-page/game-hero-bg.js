export default async function gameHeroBG(id) {
  let bg;

  await fetch(`https://api.rawg.io/api/games/${id}?key=335197e656a04bad8a99a8fef21b98b7`)
    .then((res) => res.json())
    .then((data) => {
      bg = data.background_image;
    });

  if (document.querySelector('.game-page-hero')) {
    document.querySelector('.game-page-hero').style.backgroundImage = `url(${bg}`;
  }
}
