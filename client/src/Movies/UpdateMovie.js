import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const initialItem = {
	title: "",
	director: "",
	metascore: "",
	stars: []
};

const UpdateMovie = props => {
	const [movie, setMovie] = useState(initialItem);
	const { id } = useParams();

	useEffect(() => {
		const movieToUpdate = props.movieList.find(thing => `${thing.id}` === id);

		if (movieToUpdate) {
			setMovie(movieToUpdate);
		}
	}, [props.setMovie, id]);

	const changeHandler = ev => {
		ev.persist();
		let value = ev.target.value;
		if (ev.target.name === "metascore") {
			value = parseInt(value, 10);
        }
         else if (ev.target.name === "stars") {
            value = value.split(",")
        }

		setMovie({
			...movie,
			[ev.target.name]: value
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		axios
			.put(`http://localhost:5000/api/movies/${id}`, movie)
			.then(res => {
				console.log(res)
                props.getMovieList();
				props.history.push(`/movies/${id}`);
			})
			.catch(err => console.log(err));
	};

	return (
		<div>
			<h2>Update Movie</h2>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="title"
					onChange={changeHandler}
					placeholder="Title"
					value={movie.title}
				/>
				

				<input
					type="text"
					name="director"
					onChange={changeHandler}
					placeholder="Director"
					value={movie.director}
				/>
				

				<input
					type="number"
					name="metascore"
					onChange={changeHandler}
					placeholder="Metascore"
					value={movie.metascore}
				/>
				

				<input
					type="string"
					name="stars"
					onChange={changeHandler}
					placeholder="Stars"
					value={movie.stars}
				/>
				
	    	    <button type="submit">Update</button>
			</form>
		</div>
	);
};

export default UpdateMovie;
