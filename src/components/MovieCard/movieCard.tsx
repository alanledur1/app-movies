'use client';

import Link from 'next/link'; // Importe o Link do Next.js
import { Movie } from '@/types/movie';
import StartRating from '../StarRating/starRating';
import './movieCard.scss';

export interface Props {
    movie: Movie;
}

export default function MovieCard(props: Props) {
    const { movie } = props;

    return (
        <li className='movie-card'>
            <div className='movie-poster'>
                <img 
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
                    alt={movie.title} 
                />
            </div>
            <div className='movie-infos'>
                <h2 className='movie-title'>
                    {movie.title}
                </h2>
                {movie.vote_average > 0 && 
                    <StartRating 
                        rating={movie.vote_average}
                    />
                }
                <div className='hidden-content'>
                    {movie.overview && 
                        <p className='description'>
                            {movie.overview.length > 100 
                                ? `${movie.overview.substring(0, 100)}...` 
                                : movie.overview}
                        </p>
                    }
                    <Link href={`/movieDetails/${movie.id}`} passHref>
                        <button className="btn-default">
                                Ver mais
                        </button>
                    </Link>
                </div>
            </div>
        </li>
    );
}
