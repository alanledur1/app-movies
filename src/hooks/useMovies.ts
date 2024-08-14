import { Movie } from "@/types/movie";
import axios from "axios";
import { useEffect, useState } from "react";



export default function useMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() =>{
        const cachedMovies = localStorage.getItem('movies');
        if (cachedMovies) {
            setMovies(JSON.parse(cachedMovies));
            setIsLoading(false);
        } else {
            getMovies();
        }
    }, []);

    const getMovies = async () => {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
                params: {
                    api_key: process.env.NEXT_PUBLIC_API_KEY,
                    language: 'pt-BR',
                    page: 1
                },
            });
            const fetchedMovies = response.data.results;
            setMovies(fetchedMovies);
            localStorage.setItem('movies', JSON.stringify(fetchedMovies));
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    };


    return  { movies, isLoading, error };
}