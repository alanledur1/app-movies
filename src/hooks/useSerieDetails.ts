import { useEffect, useState } from "react"
import axios from "axios";
import { Serie } from "@/types/serie";


export default function useSerieDetails (serieId: string | string[] | undefined) {
    const [serie, setSerie] = useState<Serie | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);


    useEffect(() => { 
        if (serieId) {
            getMovieDetails(serieId);
        }
    }, [serieId]);

    const getMovieDetails = async (id: string | string[]) => {
        if (typeof id === "string") {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${serieId}`, {
                    params: {
                        api_key: process.env.NEXT_PUBLIC_API_KEY,
                        language: 'pt-BR'
                    },
                });
                // Se a requisição for bem-sucedida, define o estado da serie para os dados da resposta
                setSerie(response.data);
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

    return { serie, loading, error };
}