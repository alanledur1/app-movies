import { Serie } from "@/types/serie";
import axios from "axios";
import { useEffect, useState } from "react";

export default function usePopularSeries(limit: number) {
    const [series, setSeries] = useState<Serie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        getPopularSeries();
    }, []);

    const getPopularSeries = async () => {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/discover/tv', {
                params: {
                    api_key: process.env.NEXT_PUBLIC_API_KEY,
                    language: 'pt-BR',
                    sort_by: 'popularity',
                    page: 1, // Pega apenas a primeira página
                },
            });

            // Limita o número de séries a serem exibidas
            setSeries(response.data.results.slice(0, limit));
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    };

    return { series, isLoading, error };
}
