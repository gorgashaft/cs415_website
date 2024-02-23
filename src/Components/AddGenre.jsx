import React, {useState} from "react";
//import { useNavigate } from "react-router-dom"

export const AddGenre = (props) => {
    //const navigate = useNavigate();
    const [genre, setGenre] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null)
        let success = true
        let errorText = ''

        const payload = JSON.stringify({
            genre: genre,
        })
        try {
            fetch('http://localhost:8000/genre/',{
            method: 'POST',
            body: payload,
            headers:{
                'Content-Type': 'application/json'
                }
            }).then(res => {
                    console.log(res)
                    if (!res.ok){
                        errorText = "Error: " + res.status + ' - '
                        success = false
                        return res.json()
                    }
                    else {
                        success = true
                        return res.json()
                    }
                 }
              ).then(data => {
                if (!success) {
                    for (const err in data.errors){
                    for (const msg in data.errors[err]) errorText += data.errors[err][msg]
                    }
                    console.log(errorText)
                    setError(errorText)
                }

            })
            .catch(error => {
                success = false
                console.error(error)
            });
            if (success) {
                setGenre('')
                setError('Genre Added!')
            }
            else{
                setError(errorText)
            }
        } catch (error) {
            console.error(error);
            setError('Error Adding Genre - Check Yo Info!')
        }

    }

    return (
        <div >
        <h2>Add Genre</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="genre">Genre</label>
            <input required value={genre} onChange={(e) => setGenre(e.target.value)} type="text" placeholder="i.e. Action, Comedy" id="genre" name="genre"/>
            
            <button type="submit">Submit</button>
            <p className="text-success"><b>{error}</b></p>
        </form>
    </div>
    )
}

export default AddGenre;