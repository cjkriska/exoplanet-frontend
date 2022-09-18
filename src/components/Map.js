import { useEffect } from "react";
import { useState } from "react";
import Plot from "react-plotly.js";
import SystemModal from "./SystemModal";

function Map() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [systemModalShow, setSystemModalShow] = useState(false);
    const [currentSystem, setCurrentSystem] = useState(null);

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

    const showSystemModal = () => {
        setSystemModalShow(!systemModalShow);
    };

    const displaySystem = (e) => {
        const system = data[e.points[0].pointNumber];
        setCurrentSystem(system);
        showSystemModal();
    };

    const getSystemNames = () => {
        return data.map(system => system.host.name);
    }

    return (
        <div className="">
            <div className="flex flex-row min-h-screen justify-center items-center">
                {loading && <div>Loading....</div>}
                {error && <div>{`There was a problem fetching the data - ${error}`}</div>}
                {data && 
                <Plot
                    onClick={e => displaySystem(e)}
                    data={[
                        {
                        x: getXData(),
                        y: getYData(),
                        z: getZData(),
                        text: getSystemNames(),
                        type: 'scatter3d',
                        mode: 'markers',
                        marker: {color: 'yellow', size: 2},
                        hovertemplate: "%{text}<extra></extra>"
                        }
                    ]}
                    layout={ {width: 1000, 
                              height: 700,
                              paper_bgcolor: 'rgba(0,0,0,0)', 
                              plot_bgcolor: 'rgba(0,0,0,0)',
                              hoverlabel: {bgcolor: '#FFF'},
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
            <div>
                <SystemModal onClose={showSystemModal} show={systemModalShow} system={currentSystem}/>
            </div>
        </div>

    );
}

export default Map;