'use client';

import { useParams } from 'next/navigation';
import './page.scss';
import React from 'react';
import  StartRating  from '../../../components/StarRating/starRating';
import useSerieDetails from '@/hooks/useSerieDetails';

export default function SerieDetails() {
    const { id } = useParams(); // Use useParams para obter o parâmetro da URL
    const { serie, loading, error } = useSerieDetails(id);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error.message}</div>;

    return (
        <div className="serie-details-page">
            {serie && (
                <div className='content'> 
                    <img
                        src={`https://image.tmdb.org/t/p/original${serie.poster_path}`}
                        alt={serie.title}
                    />
                    <div className='details-content'>
                        <h1>{serie.title}</h1>
                        <p className='description-serie'>{serie.overview}</p>
                        <p><strong>Data de lançamento:</strong> {serie.release_date}</p>
                        <p><strong>Duração:</strong> {serie.runtime} minutos</p>
                        <p><strong>Gêneros:</strong> {serie.genres.map(genre => genre.name).join(', ')}</p>
                        <p><strong>Nota:</strong> {serie.vote_average}</p>
                        <StartRating rating={serie.vote_average} />
                    </div>
                </div>
            )}
        </div>
    );
}
