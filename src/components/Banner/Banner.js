import './Banner.css';
import { useEffect, useState } from "react";
import requests from "../data/requests";
import axios from "../../axios"

const Banner = () => {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests?.fetchNetflixOriginals)
            setMovie(request?.data?.results[Math.floor(Math.random() * request?.data?.results.length)])
            return request;
        }
        fetchData()
    }, [])

    return (
        <header className="banner" style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundPosition: "center",
        }}>
            <div className="banner__contents">
                <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
                <h1 className="banner__description">{movie?.overview}</h1>
            </div>
        </header>
    )

}

export default Banner;