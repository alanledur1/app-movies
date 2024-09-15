import { Serie } from "@/types/serie";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useSerie() {
    const [series, setSeries] = useState<Serie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        getSeries();
    }, []);

    const getSeries = async () => {
        try {
            let fetchedSeries: Serie[] = [];
            const totalPages = 20;

            for (let page = 1; page <= totalPages; page++) {
                const response = await axios.get('https://api.themoviedb.org/3/discover/tv', {
                    params: {
                        api_key: process.env.NEXT_PUBLIC_API_KEY,
                        language: 'pt-BR',
                        sort_by: 'popularity',
                        page: page,
                    },
                });
                
                fetchedSeries = [...fetchedSeries, ...response.data.results];
            }

            // Define o estado com as séries buscadas
            setSeries(fetchedSeries);
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    };

    return { series, isLoading, error };
}
