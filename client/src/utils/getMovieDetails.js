export function getDirector(data) {
  const directors = [];

  data.tmdbCredits.crew.forEach((result) => {
    if (result.job === "Director") {
      directors.push(result.name);
    }
  });

  return directors;
}

export function getCast(data) {
  const cast = data.tmdbCredits.cast.slice(0, 10).map((result) => {
    return result.name;
  });

  return cast.join(", ");
}

export function getGenres(data) {
  const genres = data.tmdbDetails.genres.map((result) => {
    return result.name;
  });

  return genres;
}

export function getYear(data) {
  const year = new Date(data.tmdbDetails.release_date).getFullYear();
  return year;
}
