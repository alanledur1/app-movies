'use client';

import useSerie from '@/hooks/useSeries';
import ReactLoading from 'react-loading';
import SerieCard from '../SerieCard/serieCard';
import './serieList.scss';
import { useState } from 'react';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

export default function SerieList() {
    const { series, isLoading } = useSerie();
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(series.length / 40);

    const handleNextChange = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    }

    const handlePrevChange = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }

    const indexOfLastSerie = currentPage * 40;
    const indexOfFirstSerie = indexOfLastSerie - 40;
    const currentSerie = series.slice(indexOfFirstSerie, indexOfLastSerie);

    if (isLoading) {
        return (
            <div className='loading-container'>
                <ReactLoading type="spin" color="#6046ff" height={'5%'} width={'5%'} />
            </div>
        )  // return loading spinner until data is fetched and mapped into cards.  // replace 'spinningBubbles' with desired loading type.  // adjust color and dimensions as needed.  // replace '#123456' with your desired loading spinner color.  // replace '80' with your desired loading spinner height and width.  // replace 'SerieCard' with your actual serie card component.  // replace 'key={serie.id}' with your actual serie id prop.  // replace 'language: 'pt-BR'' with your desired language code.  // replace 'e5edd846266d0cedfd3f5cdfe579da45' with your actual API
    }

    return (
        <div>
            <ul className="serie-list">
                {currentSerie.map(serie =>
                    <SerieCard
                        key={serie.id}
                        serie={serie}
                    />
                )}
            </ul>
            <div className='serie-radio'>
                <div className='radio-input'>
                    <label>
                        <button onClick={handlePrevChange} disabled={currentPage === 1}><FaAngleLeft /></button>
                    </label>
                    {[...Array(totalPages)].map((_, index) => (
                        <label key={index}>
                            <input 
                                value={`value-${index + 1}`}
                                name='value-radio'
                                id={`value-${index + 1}`}
                                type="radio"
                                checked={currentPage === index + 1}
                                onChange={() => setCurrentPage(index + 1)}
                            />
                            <span>{index + 1}</span>
                        </label>
                    ))}
                    <label>
                        <button onClick={handleNextChange} disabled={currentPage === totalPages}><FaAngleRight /></button>
                    </label>
                </div>
            </div>
        </div>
    )
}