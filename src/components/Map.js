import { useEffect } from "react";
import { useState } from "react";

function Map() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/v1/systems", {
            method: 'GET',
            headers: new Headers({"Authorization": `Basic ${window.btoa("admin:password123")}`})
        })
            .then(response => {
                if(!response.ok) {
                    throw new Error(`This is an HTTP error: The status is ${response.status}`)
                }
                return response.json();
            })
            .then(actualData => {
                setData(actualData);
                setError(null);
            })
            .catch(err => {
                setError(err.message);
                setData(null);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="">
            <h1>Systems</h1>
            <img className ="m-auto opacity-50 fixed" width="700" alt="Milky Way Galaxy (transparent background)" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Milky_Way_Galaxy_%28transparent_background%29.png/512px-Milky_Way_Galaxy_%28transparent_background%29.png" />
            {loading && <div>Loading data...</div>}
            {error && <div>{`There was a problem fetching the data - ${error}`}</div>}
            <ul>
                {data && data.map((system, id) => (
                    <li key={id}>{system.host.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Map;