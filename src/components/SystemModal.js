function SystemModal({onClose, show, system}) {

    if(!show) return null;

    const close = e => {
        onClose && onClose(e);
    }

    return (
        <div className="bg-dark-background w-[100%] h-[100%] z-0 top-0 absolute">

            <div className="flex flex-col w-3/4 h-3/4 bg-slate-200 text-black border-2 shadow-lg m-auto mt-20 z-10">
                <button className="rounded-full p-1 block mr-0 ml-auto" onClick={e => close(e)}>
                    <svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 10.586L6.707 5.293a1 1 0 00-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 001.414 1.414L12 13.414l5.293 5.293a1 1 0 001.414-1.414L13.414 12l5.293-5.293a1 1 0 10-1.414-1.414L12 10.586z" fill="currentColor"></path></svg>
                </button>

                <div className="grid grid-cols-3 divide-x divide-slate-700 h-full p-7">
                    <div className="flex flex-col col-span-2 p-3">
                        <div className="text-2xl">{system.host.name}</div>
                        <div className="grow">
                            <ul>
                                {system.planets.map(planet => <li>{planet.name}</li>)}
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col divide-y divide-slate-700 p-3">
                        <div className="flex flex-col basis-2/3">
                            <div className="basis-1/5"><h1 className="text-2xl">{system.planets[0].name}</h1></div>
                            <div className="basis-2/5">

                            </div>
                            <div className="basis-2/5">
                                <ul className="text-sm">
                                    <li>Type: Planet</li>
                                    <li>Name: {system.planets[0].name}</li>
                                    <li>Discovered: {system.planets[0].discoveryYear}</li>
                                    <li>Info: info</li>
                                    <li>More Info: more info</li>
                                </ul>
                            </div>
                        </div>
                        <div className="basis-1/3">

                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default SystemModal;