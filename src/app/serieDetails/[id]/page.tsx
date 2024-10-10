'use client';

import { useParams } from 'next/navigation';
import './page.scss';
import React from 'react';
import  StartRating  from '../../../components/StarRating/starRating';
import useSerieDetails from '@/hooks/useSerieDetails';

export default function SerieDetails() {
    const { id } = useParams(); // Use useParams para obter o parâmetro da URL
    const { serie, seasons, trailer, loading, error } = useSerieDetails(id);


    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error.message}</div>;

    return (
        <div className="serie-details-page">
            {serie && (
                <div className='content'> 
                    <img
                        src={`https://image.tmdb.org/t/p/original${serie.poster_path}`}
                        alt={serie.name}
                    />
                    <div className='details-content'>
                        <h1>{serie.name}</h1>
                        <p className='description-serie'>{serie.overview}</p>
                        <p><strong>Data de lançamento:</strong> {serie.release_date}</p>
                        <p><strong>Duração:</strong> {serie.runtime} minutos</p>
                        <p><strong>Gêneros:</strong> {serie.genres.map(genre => genre.name).join(', ')}</p>
                        <p><strong>Nota:</strong> {serie.vote_average}</p>
                        <StartRating rating={serie.vote_average} />
                    </div>
                </div>
            )}

            <div className="container">
                <div className="bottom-content">
                {seasons && seasons.length > 0 && (
                    <div className="seasons-list">
                        <h2>Temporadas</h2>
                        <ul>
                            {seasons.map(season => (
                                <li key={season.season_number}>
                                    <strong>Temporada {season.season_number}:</strong> {season.episode_count} episódios
                                    <p><strong>Data de lançamento:</strong> {season.air_date}</p>
                                    <p>{season.overview}</p>
                                    {season.poster_path && (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
                                            alt={season.name}
                                            className="season-poster"
                                        />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                </div>
                <div className="trailer-container">
                    {trailer && (
                        <div className="trailer-content">
                            <iframe
                                src={trailer}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className='iframe'
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
