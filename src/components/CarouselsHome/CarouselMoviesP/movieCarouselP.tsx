'use client';

import { Movie } from "@/types/movie";
import { useState } from "react"
import { FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa6";
import './movieCarouselP.scss';
import MovieCard from "@/components/MovieCard/movieCard";

interface MovieCarouselProps {
    movie: Movie[];
    limit?: number; // Número de filmes a serem exibidos inicialmente no carrossel. Default: 5.
    totalLimit?: number; // Número máximo de filmes a serem exibidos. Default: 20.
}


export default function MoviesPopular({movie, limit = 5, totalLimit = 10 }: MovieCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleLimit, setVisibleLimit] = useState(limit);


    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0? 0 : prevIndex - 1
        );
    };
    
    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + limit >= movie.length ? prevIndex : prevIndex + 1
        );
    };

    const handleShowMore = () => {
        setVisibleLimit((prevLimit) => {
            const newLimit = Math.min(prevLimit + limit, totalLimit);
            return newLimit;
        });
    };

    const visibleMoviesPopular = movie.slice(currentIndex, currentIndex + limit);
    
    return(
        <div className="movie-carouselP">
            <button
                className="carousel-control left"
                onClick={handlePrev}
                disabled={currentIndex === 0}
            >
                <FaArrowLeft />
            </button>
            <div className="carousel-content">
                {visibleMoviesPopular.map((movieItem) => (
                    <MovieCard key={movieItem.id} movie={movieItem} />
                ))}
                {visibleLimit >= totalLimit && (
                    <button className="more-button" onClick={handleShowMore} >
                        <FaPlus />
                        Ver mais
                    </button>
                )}
            </div>
            <button
                className="carousel-control right"
                onClick={handleNext}
                disabled={currentIndex + limit >= movie.length}
            >
                <FaArrowRight />
            </button>
        </div>
    )
}