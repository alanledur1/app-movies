'use client';

import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './movieCarousel.scss';
import { useRouter } from "next/navigation";
import { Movie } from "@/types/movie";

interface MovieCarouselProps {
    movies: Movie[];
    limit?: number;
}

export default function MovieCarousel({ movies = [], limit = 10 }: MovieCarouselProps) { // Inicializando movies como um array vazio
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter();

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

    
    // Verificando se o movies é um array e tem elementos
    const visibleMovies = movies.slice(currentIndex, currentIndex + limit);
    
    const handleDetails = (id: number) => {
        // Use o ID do filme para criar a rota correta
        router.push(`/movieDetails/${id}`); // Ajuste conforme a estrutura de rotas do seu projeto
    };
    return (
        <div className="movie-carousel">
            <button className="carousel-control left" onClick={handlePrev} disabled={currentIndex === 0}>
                <FaArrowLeft style={{ color: "#fff", fontSize: "30px" }} />
            </button>
            <div className="carousel-content">
                {visibleMovies.length > 0 ? (
                    visibleMovies.map((movie) => (
                        <div key={movie.id} className="movie-slide" onClick={() => handleDetails(movie.id)}>
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <h3>{movie.title}</h3>
                        </div>
                    ))
                ) : (
                    <p>Nenhum filme disponível.</p> // Mensagem quando não há filmes
                )}
            </div>
            <button className="carousel-control right" onClick={handleNext} disabled={currentIndex >= movies.length - limit}>
                <FaArrowRight style={{ color: "#fff", fontSize: "30px" }} />
            </button>
        </div>
    );
}
