function SystemModal({onClose, show, children, system}) {

    if(!show) return null;

    const close = e => {
        onClose && onClose(e);
    }

    return (
        <div className="bg-dark-background w-[100%] h-[100%] z-0 top-0 absolute">
            <div className="w-3/4 h-3/4 bg-slate-200 text-black border-2 shadow-lg m-auto mt-20 z-10">
                <button className="rounded-full p-1 block mr-0 ml-auto" onClick={e => close(e)}>
                    <svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 10.586L6.707 5.293a1 1 0 00-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 001.414 1.414L12 13.414l5.293 5.293a1 1 0 001.414-1.414L13.414 12l5.293-5.293a1 1 0 10-1.414-1.414L12 10.586z" fill="currentColor"></path></svg>
                </button>
                <div className="p-7">
                    <div>{children}</div>
                    <div className="underline text-xl mb-4">{system.host.name}</div>
                    <div>
                        <ul>
                            {system.planets.map((planet, index) => <li key={index}>{planet.name}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SystemModal;