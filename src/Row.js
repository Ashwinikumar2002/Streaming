import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url ="https://image.tmdb.org/t/p/original/";

function Row({  title, fetchUrl, isLargeRow }){
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    // A snippet of code which rune based on a specific conditions
    useEffect(() => {
        // if [], run once when the row loads, and dont run that again
    async function fetchData() {
        const request= await axios.get(fetchUrl);
        console.log(request.data.results);
        setMovies(request.data.results);
        return request;
    }
    fetchData();
    }, [fetchUrl]);

    console.log(movies);

    const handleClick= (movie) => {
        if(trailerUrl){
            setTrailerUrl('');
        }
        else{
            movieTrailer(movie?.name || "")
            .then(url => {
                const urlParams= new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            }).catch(error => console.log(error)) ;
        }
    }

    const opts= {
        height: "390",
        width: "100%",
        playerVars: {
                autoplay: 1,
        },
    };

    return(
        <div className="row">
            <h2>{title}</h2>
                <div className="row__posters">
                {/* row__poster */}
                {movies.map(movie => (
                    <img 
                    key={movie.id}
                    onClick={() =>handleClick(movie)}
                    className= {`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
                ))}
                {/* posters */}
            </div>
                {/* container-posters */}
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            </div>

    )
}

export default Row