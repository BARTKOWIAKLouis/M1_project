import { useState } from "react";
import type { AuthorModel } from "../AuthorModel";
import type { BookModel } from "../../Books/BookModel";


export const useAuthorDetailProvider = (id: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [authorInfo, setAuthorInfo] = useState<{author: AuthorModel, writtenBooks: BookModel[], totalCount: number, AverageSales: number} | null>(null);

    const loadAuthorDetail = () => {
        setIsLoading(true);
        fetch(`http://localhost:3000/authors/${id}`)
            .then(response => response.json())
            .then(data => setAuthorInfo(data.data))
            .finally(() => setIsLoading(false));
    }

    return { isLoading, authorInfo, loadAuthorDetail };

}