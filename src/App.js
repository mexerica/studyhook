import React, {useState, useEffect} from 'react';

export default function App() {
    const [repo, setRepo] = useState([]);
    const [local, setLocal] = useState([]);
    let fav = "favorito";

    useEffect(() => {
        (async () => {
            const response = await fetch('https://api.github.com/users/Mexerica/repos');
            const data = await response.json();
            setRepo(data);
        })()
    }, []);// passar vazio significa que vai ocorrer apenas uma unica vez

    useEffect(() => {
        const filtered = repo.filter(repot => repot.favo);
        document.title = "Voce tem " + filtered.lenght + " favoritos";
    }, [repo]);

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(handlePositionReceived);

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    function handleFavo(id) {
        const newRepo = repo.map(repox => {
            console.log(fav);
            return repox.id == id ? {...repox, favo: true} : repox
        });
        setRepo(newRepo);
    }

    function handlePositionReceived({ coords }) {
        const { latitude, longitude } = coords;

        setLocal({ latitude, longitude });
    }

    return (
        <>
            Latitude: {local.latitude} <br />
            Longitude: {local.longitude}
            <ul>
                {repo.map(repos => (
                    <li key={repos.id}>
                        {repos.name}
                        <button onClick={() => handleFavo(repos.id)}>Favoritar</button>
                    </li>
                ))}
            </ul>
        </>
    );
}


