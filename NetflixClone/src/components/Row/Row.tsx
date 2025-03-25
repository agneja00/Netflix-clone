import './Row.css';
import { useState, useEffect } from "react";
import axios from "../../axios";
import Youtube from "react-youtube"

const Row = ({ category, fetchUrl, isLargeRow = false }) => {
    const base_url = "https://image.tmdb.org/t/p/original";
    const MOVIE_API = "https://api.themoviedb.org/3/";
    const API_KEY = "109708d3c0bb4e9e4cecc4ceeb471fb5"

    const [trailer, setTrailer] = useState(null)
    const [movies, setMovies] = useState([])
    const [movie, setMovie] = useState({ category: "Loading Movies" })

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results)
            return request;
        }
        fetchData();
    }, [fetchUrl]);


    const fetchMovie = async (id) => {
        const { data } = await axios.get(`movie/${id}`,
            {
                params: {
                    api_key: API_KEY,
                    append_to_response: "videos"
                }
            })

        if (data.videos && data.videos.results) {
            const trailer = data?.videos.results.find(vid => vid.name === "Oficial Trailer")
            setTrailer(trailer ? trailer : data?.videos.results[0])
        }
        setMovie(data)
    }

    const selectMovie = (movie) => {
        fetchMovie(movie?.id)
        setMovie(movie)
    }

    return (
        <div className="row__container">
            <h2>{category}</h2>

            <div className="row__images">
                {movies?.map((movie) => (
                    <div className="row__images__card" key={movie?.id}>
                        <img
                            className={`row__image ${isLargeRow && "row__imageLarge"}`}
                            src={`${base_url}${isLargeRow ? movie?.poster_path : movie?.backdrop_path}`}
                            alt={movie?.name}
                            onClick={() => selectMovie(movie)}>
                        </img>
                        <h3 className="movie__title">{movie?.title}</h3>
                    </div>
                ))}
            </div>
            {trailer && <Youtube
                videoId={trailer?.key}
                opts={{
                    width: '100%',
                    height: '390',
                    playerVars: {
                        autoplay: 1,
                        controls: 0,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0,
                    },
                }} />}
        </div>
    )
}

export default Row;
