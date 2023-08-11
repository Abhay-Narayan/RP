import React, { useEffect, useState } from 'react'
import './Row.css'
import axios from './axios';
function Row({title, fetchUrl, isLargeRow=false}) {
    const base_url="https://image.tmdb.org/t/p/original/";
    const [movies,setMovies]=useState([]);
    useEffect(()=>{
        async function fetchmovies(){
            const requests=await axios.get(fetchUrl);
            setMovies(requests.data.results)
            return requests;
        }
        fetchmovies();
    },[fetchUrl])
    
  return (
    <div className='row'>
        <h2>{title}</h2>
        <div className='row__posters'>
        {
            movies.map(movie=>(
                ((movie.poster_path ))&&(
                        <img className="row__poster row__posterLarge" key={movie.id} src={`${base_url}${
                        movie.poster_path
                    }`} alt={movie.name}/>  
                     )
            ))
        }
        </div>
    </div>
  )
}

export default Row