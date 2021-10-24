export async function getMovies(url) {
  const movies = await fetch(url).then((res) => res.json());
  console.log(movies.results);
  return movies.results;
}
