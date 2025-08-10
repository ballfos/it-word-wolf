import { useEffect, useState } from "react";
import { fetchDifficulties, type Difficulty } from "@/api";

export default function useDifficulties() {
    const [difficulties, setDifficulties] = useState<Difficulty[]>([]);

    useEffect(() => {
        const loadDifficulties = async () => {
            const data = await fetchDifficulties();
            setDifficulties(data);
        };
        loadDifficulties();
    }, []);

    return difficulties;
}
