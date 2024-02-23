import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"


const MovieList = () => {
    const navigate = useNavigate();
    const [columns, setColumns] = useState([]);
    const [records, setRecords] = useState([]);


    useEffect(() => {
        if (!window.sessionStorage.getItem("auth")) navigate('/unauthorized')
        fetch('http://localhost:8000/movies/')
        .then(res => res.json())
        .then(data => {
            setColumns(Object.keys(data.Movies[0]))
            setRecords(data.Movies)
        })
        .catch(error => console.error(error));
    }, []);

  return (
    <div>
        <h2>Movie Database</h2>
        <table className='table'>
            <thead>
                <tr>
                    {columns.map((c, i) => (
                        <th key={i}>{c.replaceAll("_", " ").toUpperCase()}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {
                    records.map((record,i) => (
                        <tr key={i}>
                            <td>{record.movie_id}</td>
                            <td>{record.title}</td>
                            <td>{record.studio}</td>
                            <td>{record.genre}</td>
                            <td>{record.director}</td>
                            <td>{record.release_date}</td>
                            
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <button className="link-btn" onClick={() => navigate('/newmovieentry')}>+Add Movie</button>
    </div>

  )
}

export default MovieList
