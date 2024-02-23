import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AddRating = (props) => {
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const [comments, setComment] = useState('');
    const [movieId, setMovieId] = useState('');
    const [userId, setUserId] = useState('');
    const [movies, setMovies] = useState([]);
    const [users, setUser] = useState([]);
    const [error, setError] = useState('');

    // console.log(users);
    console.log(userId);

    // Fetch Movie Title
    useEffect(() => {
        fetch('http://localhost:8000/movies/')
            .then(response => response.json())
            .then(data => setMovies(data.Movies))
            .catch(error => console.error("Failed to load ", error));
    }, []);

    // Fetch User (First Name)
    useEffect(() => {
        fetch('http://localhost:8000/users/')
            .then(response => response.json())
            .then(data => setUser(data.Users))
            .catch(error => console.error("Failed to load first name", error));
    }, []);    

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        let success = true;
        let errorText = '';

        const payload = JSON.stringify({
            value,
            comments,
            movieId,
            userId
        });

        fetch('http://localhost:8000/ratings/', {
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
                setValue('');
                setComment('');
                setMovieId('');
                setUserId('');
                setError('Rating Successfully Entered!');
            }
        })
        .catch(error => {
            console.error(error);
            setError('Error Registering - Check your information and try again');
        });
    };

    return (
        <div>
            <h2>New Rating Entry</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                {/* Existing Fields */}

                <label htmlFor="value">Rating</label>
                <input required value={value} onChange={e => setValue(e.target.value)} type="text" placeholder="1-Horrid, 10-Amazing" id="value" name="value"/>

                <label htmlFor="comments">Comments</label>
                <input required value={comments} onChange={e => setComment(e.target.value)} type="text" placeholder="Comments" id="comments" name="comments"/>

                {/* Movie Title Drop-down */}
                <label htmlFor="movies">Movie</label>
                <select required value={movieId} onChange={e => setMovieId(e.target.value)} id="movies" name="movies">
                    <option value="">Movie</option>
                    {movies.map(title => (
                        <option key={title.movie_id} value={title.movie_id}>{title.title}</option>
                    ))}
                </select>

                {/* User First Name Drop-down */}
                <label htmlFor="first_name">User</label>
                <select required value={userId} onChange={e => setUserId(e.target.value)} id="first_name" name="first_name">
                    <option value="">Select User</option>
                    {users.map(first_name => (
                        <option key={first_name.user_id} value={first_name.user_id}>{first_name.first_name}</option>
                    ))}
                </select>

                <button type="submit">Submit</button>
                <p className="text-success"><b>{error}</b></p>
            </form>
        </div>
    );
}

export default AddRating;

// import React, {useState} from "react";
// //import { useNavigate } from "react-router-dom"

// export const AddRating = (props) => {
//     //const navigate = useNavigate();
//     const [value, setValue] = useState('');
//     const [comments, setComments] = useState('');
//     const [error, setError] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setError(null)
//         let success = true
//         let errorText = ''

//         const payload = JSON.stringify({
//             value: value,
//             comments: comments,
//         })
//         try {
//             fetch('http://localhost:8000/ratings/',{
//             method: 'POST',
//             body: payload,
//             headers:{
//                 'Content-Type': 'application/json'
//                 }
//             }).then(res => {
//                     console.log(res)
//                     if (!res.ok){
//                         errorText = "Error: " + res.status + ' - '
//                         success = false
//                         return res.json()
//                     }
//                     else {
//                         success = true
//                         return res.json()
//                     }
//                  }
//               ).then(data => {
//                 if (!success) {
//                     for (const err in data.errors){
//                     for (const msg in data.errors[err]) errorText += data.errors[err][msg]
//                     }
//                     console.log(errorText)
//                     setError(errorText)
//                 }

//             })
//             .catch(error => {
//                 success = false
//                 console.error(error)
//             });
//             if (success) {
//                 setValue('')
//                 setComments('')
//                 setError('User Rating Added!')
//             }
//             else{
//                 setError(errorText)
//             }
//         } catch (error) {
//             console.error(error);
//             setError('Error Adding Rating - Check Yo Data and Try Again Fool!')
//         }

//     }

//     return (
//         <div >
//         <h2>Add User Rating</h2>
//         <form className="register-form" onSubmit={handleSubmit}>
//             <label htmlFor="value">User Rating</label>
//             <input required value={value} onChange={(e) => setValue(e.target.value)} type="int" placeholder="1-Horrid, 10-Incredible" id="value" name="value"/>
            
//             <label htmlFor="comments">User Comments</label>
//             <input required value={comments} onChange={(e) => setComments(e.target.value)} type="text" placeholder="Comments" id="comments" name="comments"/>
            
//             <button type="submit">Submit</button>
            
//             <p className="text-success"><b>{error}</b></p>
//         </form>
//     </div>
//     )
// }

// export default AddRating