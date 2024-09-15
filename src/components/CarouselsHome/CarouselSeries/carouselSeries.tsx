'use client';

import SerieCard from "@/components/SerieCard/serieCard";
import { Serie } from "@/types/serie";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa";
import './carouselSeries.scss';

interface SeriesCarouselProps {
    serie: Serie[];
    limit?: number; // Número de séries a serem exibidas inicialmente no carrossel. Default: 5.
    totalLimit?: number; // Número máximo de séries a serem exibidas. Default: 20.
}

export default function CarouselSeries({ serie, limit = 5, totalLimit = 20 }: SeriesCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleLimit, setVisibleLimit] = useState(limit);

    // Verifica se há mais itens disponíveis e o botão "Ver mais" deve ser exibido
    const hasMoreItems = serie.length > visibleLimit;

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? 0 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex + limit >= serie.length ? prevIndex : prevIndex + 1
        );
    };

    const handleShowMore = () => {
        setVisibleLimit((prevLimit) => {
            const newLimit = Math.min(prevLimit + limit, totalLimit);
            return newLimit;
        });
    };

    // Calcula o índice final dos itens visíveis
    const visibleSeries = serie.slice(currentIndex, currentIndex + limit);

    return (
        <div className="serie-carousel">
            <button 
                className="carousel-control left" 
                onClick={handlePrev} 
                disabled={currentIndex === 0} // Desativa o botão se no início
            >
                <FaArrowLeft />
            </button>
            <div className="carousel-content">
                {visibleSeries.map((serieItem) => (
                    <SerieCard key={serieItem.id} serie={serieItem} />
                ))}
                {visibleLimit >= totalLimit && (
                    <button className="more-button" onClick={handleShowMore}>
                        <FaPlus />
                        Ver mais
                    </button>
                )}
            </div>
            <button 
                className="carousel-control right" 
                onClick={handleNext} 
                disabled={currentIndex + limit >= serie.length} // Desativa o botão se no final
            >
                <FaArrowRight />
            </button>
        </div>
    );
}
