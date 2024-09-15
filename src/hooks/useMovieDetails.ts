import { useEffect, useState } from "react"
import axios from "axios";
import { Movie } from "@/types/movie";

export default function useMovieDetails (movieId: string | string[] | undefined) {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);


    useEffect(() => { 
        if (movieId) {
            getMovieDetails(movieId);
        }
    }, [movieId]);

    const getMovieDetails = async (id: string | string[]) => {
        if (typeof id === "string") {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                    params: {
                        api_key: process.env.NEXT_PUBLIC_API_KEY,
                        language: 'pt-BR'
                    },
                });
                // Se a requisição for bem-sucedida, define o estado do filme para os dados da resposta
                setMovie(response.data);
            } catch (err) {
                // Se houver um erro, define o estado de erro para o erro capturado
                setError(err as Error);
            } finally {
                // Define loading como false quando a requisição é finalizada
                setLoading(false);
            }
        } else {
            setError(new Error);
        }
    }

    return { movie, loading, error };
}