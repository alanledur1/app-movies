import { Serie } from "@/types/serie";
import StartRating from "../StarRating/starRating";
import './serieCard.scss';

export interface SerieCardProps {
    serie: Serie;
    className?: string; // Adicione a propriedade className
}

export default function SerieCard({serie, className }: SerieCardProps) {

    return (
        <li className={`serie-card ${className}`}>
            <div className="serie-poster">
                <img 
                    src={`https://image.tmdb.org/t/p/original${serie.poster_path}`} 
                    alt={serie.title} />
            </div>
            <div className="serie-infos">
                <h2 className="serie-title">
                    {serie.title}
                </h2>

                {serie.vote_average > 0 &&
                    <StartRating 
                        rating={serie.vote_average}
                    />
                }

                <div className="hidden-content">
                    {serie.overview && 
                        <p className="description">
                            {serie.overview.length > 100
                                ? `${serie.overview.substring(0, 100)}...`
                                : serie.overview}
                        </p>
                    }

                    <button className="btn-default">
                        Ver mais
                    </button>
                </div>
            </div>
        </li>
    )
}