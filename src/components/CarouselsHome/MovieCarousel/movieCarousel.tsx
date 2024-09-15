'use client';

import { useState } from "react";
import { Movie } from "@/types/movie";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './movieCarousel.scss';

interface MovieCarouselProps {
    movies: Movie[];
    limit?: number;
}

export default function MovieCarousel({ movies, limit = 10 }: MovieCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < movies.length - limit) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const visibleMovies = movies.slice(currentIndex, currentIndex + limit);

    return (
        <div className="movie-carousel">
            <button className="carousel-control left" onClick={handlePrev}>
                <FaArrowLeft style={{ color: "#fff", fontSize: "30px" }} />
            </button>
            <div className="carousel-content">
                {visibleMovies.map((movie) => (
                    <div key={movie.id} className="movie-slide">
                        <img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        />
                        <h3>{movie.title}</h3>
                    </div>
                ))}
            </div>
            <button className="carousel-control right" onClick={handleNext}>
                <FaArrowRight style={{ color: "#fff", fontSize: "30px" }} />
            </button>
        </div>
    );
}
