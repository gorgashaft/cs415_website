import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"


const GenreList = () => {
    const navigate = useNavigate();
    const [columns, setColumns] = useState([]);
    const [records, setRecords] = useState([]);


    useEffect(() => {
        if (!window.sessionStorage.getItem("auth")) navigate('/unauthorized')
        fetch('http://localhost:8000/genre/')
        .then(res => res.json())
        .then(data => {
            setColumns(Object.keys(data.Genres[0]))
            setRecords(data.Genres)
        })
        .catch(error => console.error(error));
    }, []);

  return (
    <div>
        <h2>Genres</h2>
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
                            <td>{record.genre_id}</td>
                            <td>{record.genre}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <button className="link-btn" onClick={() => navigate('/newgenreentry')}>+Add Genre</button>
    </div>

  )
}

export default GenreList