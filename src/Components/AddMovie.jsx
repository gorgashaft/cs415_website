import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AddMovie = (props) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [release_date, setRelease] = useState('');
    const [studioId, setStudioId] = useState('');
    const [genreId, setGenreId] = useState('');
    const [studios, setStudios] = useState([]);
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState('');

    console.log(studios);
    // Fetch Studios
    useEffect(() => {
        fetch('http://localhost:8000/studio/')
            .then(response => response.json())
            .then(data => setStudios(data.Studios))
            .catch(error => console.error("Failed to load studios", error));
    }, []);

    // Fetch Genres
    useEffect(() => {
        fetch('http://localhost:8000/genre/')
            .then(response => response.json())
            .then(data => setGenres(data.Genres))
            .catch(error => console.error("Failed to load genres", error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        let success = true;
        let errorText = '';

        const payload = JSON.stringify({
            title,
            director,
            release_date,
            studioId,
            genreId
        });

        fetch('http://localhost:8000/movies/', {
            method: 'POST',
            body: payload,
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
            if (!res.ok) {
                success = false;
                return res.text().then(text => { throw new Error(text) });
            }
            return res.json();
        })
        .then(() => {
            if (success) {
                // Reset form on success
                setTitle('');
                setDirector('');
                setRelease('');
                setStudioId('');
                setGenreId('');
                setError('Movie Registered Successfully!');
            }
        })
        .catch(error => {
            console.error(error);
            setError('Error Registering - Check your information and try again');
        });
    };

    return (
        <div>
            <h2>New Movie Entry</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                {/* Existing Fields */}
                <label htmlFor="title">Title</label>
                <input required value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="Title" id="title" name="title"/>

                <label htmlFor="director">Director</label>
                <input required value={director} onChange={e => setDirector(e.target.value)} type="text" placeholder="Director" id="director" name="director"/>

                <label htmlFor="release_date">Release Date</label>
                <input required value={release_date} onChange={e => setRelease(e.target.value)} type="date" placeholder="Release Date" id="release_date" name="release_date"/>

                {/* Studio Drop-down */}
                <label htmlFor="studio">Studio</label>
                <select required value={studioId} onChange={e => setStudioId(e.target.value)} id="studio" name="studio">
                    <option value="">Studio</option>
                    {studios.map(studio => (
                        <option key={studio.studio_id} value={studio.studio_id}>{studio.studio}</option>
                    ))}
                </select>

                {/* Genre Drop-down */}
                <label htmlFor="genre">Genre</label>
                <select required value={genreId} onChange={e => setGenreId(e.target.value)} id="genre" name="genre">
                    <option value="">Select Genre</option>
                    {genres.map(genre => (
                        <option key={genre.genre_id} value={genre.genre_id}>{genre.genre}</option>
                    ))}
                </select>

                <button type="submit">Submit</button>
                <p className="text-success"><b>{error}</b></p>
            </form>
        </div>
    );
}

export default AddMovie;
