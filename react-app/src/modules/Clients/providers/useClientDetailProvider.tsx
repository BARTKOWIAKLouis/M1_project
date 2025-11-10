import { useState } from "react";
import type { ClientModel } from "../ClientModel";
import type { BookModel } from "../../Books/BookModel";

export const useClientDetailProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [clientInfo, setClientInfo] = useState<{client: ClientModel, purchasedBooks: BookModel[] } | null>(null)

    const loadClient = () => {
    setIsLoading(true);
    fetch(`http://localhost:3000/clients/${id}`)
      .then((response) => response.json())
      .then((data) => setClientInfo(data.data))
      .finally(() => setIsLoading(false));
  }

    return { isLoading, clientInfo, loadClient };
}