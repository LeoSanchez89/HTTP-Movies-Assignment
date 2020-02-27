import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList }, props) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();
  
  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

   const handleUpdate = event => {
			event.preventDefault();
		  history.push(`/update-movie/${movie.id}`);
		};

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    console.log(props)
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
		<div className="save-wrapper">
			<MovieCard movie={movie} />

			<div className="save-button" onClick={saveMovie}>
				Save
			</div>
			<button onClick={handleUpdate}>Edit</button>
		</div>
	);
}

export default Movie;
