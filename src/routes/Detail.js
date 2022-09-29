import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovies(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);
  console.log(movies);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movies}>
          <div className={styles.movie}>
            <img
              src={movies.large_cover_image}
              alt={movies.title}
              className={styles.movie__img}
            />
            <h2 className={styles.movie__title}>{movies.title}</h2>
            <h3 className={styles.movie__year}>
              {movies.year} / rating : {movies.rating}
            </h3>
            <p className={styles.movie__summary}>{movies.description_full}</p>
            <ul className={styles.movie__genres}>
              {movies.genres.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
