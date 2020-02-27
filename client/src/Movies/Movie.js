import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
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

	const handleDelete = event => {
		event.preventDefault();
		axios
			.delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        console.log("from props", props)
        props.getMovieList();
				history.push("/");
			})
			.catch(err => console.log(err));
	};

	const saveMovie = () => {
		props.addToSavedList(movie);
	};

	useEffect(() => {
		console.log(props);
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
			<button onClick={handleDelete}>Delete</button>
		</div>
	);
}

export default Movie;
