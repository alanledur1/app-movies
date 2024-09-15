import { Movie } from "@/types/movie";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useMovies(recentOnly: boolean = false) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() =>{
        getMovies();
    }, []);

    const getMovies = async () => {
        try { 
            let fetchedMovies: Movie[] = [];
            const totalPages = 20;

            for (let page = 1; page <= totalPages; page++) {
                const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
                    params: {
                        api_key: process.env.NEXT_PUBLIC_API_KEY,
                        language: 'pt-BR',
                        page: page,
                    },
                });
                fetchedMovies = [...fetchedMovies, ...response.data.results];
            }

            if (recentOnly){
                const currentDate = new Date();
                fetchedMovies = fetchedMovies.filter(movie => {
                    const releaseDate = new Date(movie.release_date);
                    return releaseDate.getFullYear() === currentDate.getFullYear();
                });
            }


            // Define o estado com os filmes buscados
            setMovies(fetchedMovies);

            // Define um delay mínimo para o carregamento
            setTimeout(() => {
                setIsLoading(false);
                setHasLoaded(true);
            }, 700); // Tempo mínimo de exibição do loading
        } catch (err) {
            setError(err as Error);
            setIsLoading(false);
            setHasLoaded(true);
        }
    };


    return  { movies, isLoading: isLoading && !hasLoaded, error };
}