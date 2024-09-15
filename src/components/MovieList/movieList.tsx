'use client';

import './movieList.scss';
import useMovies from '@/hooks/useMovies';
import MovieCard from '../MovieCard/movieCard';
import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import Loading from '../Loading/loading';

export default function MovieList() {
    const  { movies, isLoading} = useMovies();
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(movies.length / 40);

    const handleNextChange = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    }

    const handlePrevChange = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }

    const indexOfLastMovie = currentPage * 40;
    const indexOfFirstMovie = indexOfLastMovie - 40;
    const currenteMovie = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    if (isLoading) {
        return (
            <div className='loading-container'>
                <Loading />
            </div>
        )  // return loading spinner until data is fetched and mapped into cards.  // replace 'spinningBubbles' with desired loading type.  // adjust color and dimensions as needed.  // replace '#123456' with your desired loading spinner color.  // replace '80' with your desired loading spinner height and width.  // replace 'MovieCard' with your actual movie card component.  // replace 'key={movie.id}' with your actual movie id prop.  // replace 'language: 'pt-BR'' with your desired language code.  // replace 'e5edd846266d0cedfd3f5cdfe579da45' with your actual API
    }

    return (
        <div>
            <ul className='movie-list'>
                {currenteMovie.map(movie =>
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                    />
                )}
            </ul>
            <div className='movie-radio'>
                <div className='radio-input'>
                    <label>
                        <button onClick={handlePrevChange} disabled={currentPage === 1}> <FaAngleLeft/> </button>
                    </label>
                    {[...Array(totalPages)].map((_, index) => (
                        <label key={index}>
                            <input 
                                value={`value-${index + 1}`}
                                type='radio' 
                                name='page' 
                                checked={currentPage === index + 1} 
                                onChange={() => setCurrentPage(index + 1)}
                            />
                            <span>{index + 1}</span>
                        </label>
                    ))}
                    <label>
                        <button onClick={handleNextChange} disabled={currentPage === totalPages}> <FaAngleRight/> </button>
                    </label>
                </div>
            </div>
        </div>
    )
}