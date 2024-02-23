import React, {useState} from "react";
//import { useNavigate } from "react-router-dom"

export const AddStudio = (props) => {
    //const navigate = useNavigate();
    const [studio, setStudio] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null)
        let success = true
        let errorText = ''

        const payload = JSON.stringify({
            studio: studio,
        })
        try {
            fetch('http://localhost:8000/studio/',{
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
                setStudio('')
                setError('Studio Entered!')
            }
            else{
                setError(errorText)
            }
        } catch (error) {
            console.error(error);
            setError('Error - Your Crap is Messed Up')
        }

    }

    return (
        <div >
            <h2>New Studio Entry</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="studio">Distributor</label>
                <input required value={studio} onChange={(e) => setStudio(e.target.value)} type="text" placeholder="Studio" id="studio" name="studio"/>
                 
                <button type="submit">Submit</button>
                
                <p className="text-success"><b>{error}</b></p>
            </form>
        </div>
    )
}

export default AddStudio;