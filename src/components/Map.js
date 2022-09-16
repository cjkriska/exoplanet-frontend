import { useEffect } from "react";
import { useState } from "react";
import Plot from "react-plotly.js";

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

    const getXData = () => {
        return data.map(system => {
            return system.cartX;
        });
    }
    const getYData = () => {
        return data.map(system => {
            return system.cartY;
        });
    }
    const getZData = () => {
        return data.map(system => {
            return system.cartZ;
        });
    }

    const displaySystem = (e) => {
        const system = data[e.points[0].pointNumber];
        const name = system.host.name;
        const numPlanets = system.numPlanets;
        const distance = system.distance;
        alert(name + "\n" + "Planets: " + numPlanets + "\n" + distance + " light years");
    };

    return (
        <div className="">
            <div className="flex flex-row min-h-screen justify-center items-center">
                {loading && <div>Loading....</div>}
                {data && 
                <Plot
                    onClick={e => displaySystem(e)}
                    data={[
                        {
                        x: getXData(),
                        y: getYData(),
                        z: getZData(),
                        type: 'scatter3d',
                        mode: 'markers',
                        marker: {color: 'yellow', size: 2}
                        }
                    ]}
                    layout={ {width: 1000, 
                              height: 700, 
                              title: 'A Fancy Plot', 
                              paper_bgcolor: 'rgba(0,0,0,0)', 
                              plot_bgcolor: 'rgba(0,0,0,0)',
                              scene: {
                                xaxis: {
                                    range: [-30000, 30000]
                                },
                                yaxis: {
                                    range: [-30000, 30000]
                                },
                                zaxis: {
                                    range: [-30000, 30000]
                                }
                              }
                            }}
                />
                }
            </div>

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
        </div>

    );
}

export default Map;