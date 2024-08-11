'use client';

import { useEffect,useState } from 'react';
import './movieList.scss';
import axios from 'axios';
import MovieCard from '../MovieCard/movieCard';
import { Movie } from '@/types/movie';
import ReactLoading from 'react-loading';

export default function MovieList() {
    const [movies, setMovies] = useState <Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = async () => {
        await axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params:{
                api_key: 'sua api_key vai aqui',
                language: 'pt-BR'
            }
        }).then(response =>{
            setMovies(response.data.results);
        });

        setIsLoading(false);
    }

    if (isLoading) {
        return (
            <div className='loading-container'>
                <ReactLoading type="spin" color="#6046ff" height={'5%'} width={'5%'} />
            </div>
        )  // return loading spinner until data is fetched and mapped into cards.  // replace 'spinningBubbles' with desired loading type.  // adjust color and dimensions as needed.  // replace '#123456' with your desired loading spinner color.  // replace '80' with your desired loading spinner height and width.  // replace 'MovieCard' with your actual movie card component.  // replace 'key={movie.id}' with your actual movie id prop.  // replace 'language: 'pt-BR'' with your desired language code.  // replace 'e5edd846266d0cedfd3f5cdfe579da45' with your actual API
    }

    return (
        <ul className='movie-list'>
            {movies.map(movie =>
                <MovieCard 
                    key={movie.id}
                    movie={movie}
                />
            )}
        </ul>
    )
}