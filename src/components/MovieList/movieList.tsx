'use client';

import './movieList.scss';
import MovieCard from '../MovieCard/movieCard';
import ReactLoading from 'react-loading';
import useMovies from '@/hooks/useMovies';

export default function MovieList() {
    const  { movies, isLoading} = useMovies();

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