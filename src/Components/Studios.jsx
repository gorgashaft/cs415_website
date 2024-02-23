import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"


const Studios = () => {
    const navigate = useNavigate();
    const [columns, setColumns] = useState([]);
    const [records, setRecords] = useState([]);


    useEffect(() => {
        if (!window.sessionStorage.getItem("auth")) navigate('/unauthorized')
        fetch('http://localhost:8000/studio/')
        .then(res => res.json())
        .then(data => {
            setColumns(Object.keys(data.Studios[0]))
            setRecords(data.Studios)
        })
        .catch(error => console.error(error));
    }, []);

  return (
    <div>
        <h2>Movie Studios</h2>
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
                            <td>{record.studio_id}</td>
                            <td>{record.studio}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <button className="link-btn" onClick={() => navigate('/newstudioentry')}>+Add Studio</button>
    </div>

  )
}

export default Studios
