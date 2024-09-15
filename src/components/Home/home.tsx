'use client';

import useMovies from "@/hooks/useMovies";
import MovieCarousel from "../CarouselsHome/MovieCarousel/movieCarousel";
import './home.scss';
import CarouselSeries from "../CarouselsHome/CarouselSeries/carouselSeries";
import usePopularSeries from "@/hooks/usePolularSeries";

export default function Home() {
    const { series } = usePopularSeries(20);  
    const { movies, isLoading, error } = useMovies(true);

    if (isLoading) return <div>Carregando conteúdo...</div>; // Melhor mensagem de carregamento
    if (error) return <div>Erro ao carregar conteúdo: {error.message}</div>; // Exibição de erro

    return (
        <section className="home-page">
            <div className="home-lan">
                <h1>Lançamentos</h1>
                <MovieCarousel movies={movies} />
            </div>
            <div className="movies">
                <h2>Outros filmes populares</h2>

            </div>
            <div className="series">
                <h2>Séries Populares</h2>
                <CarouselSeries serie={series} limit={5}/>
            </div>
        </section>
    );
}
