import { Serie } from "@/types/serie";
import './serieCard.scss';

export interface Props{
    serie: Serie;
}

export default function SerieCard(props: Props) {
    const serie = props.serie;
    return (
        <li className="serie-card">
            <div className="serie-poster">
                <img 
                    src={`https://image.tmdb.org/t/p/original${serie.poster_path}`} 
                    alt={serie.title} />
            </div>
            <div className="serie-infos">
                <h2 className="serie-title">
                    {serie.title}
                </h2>

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