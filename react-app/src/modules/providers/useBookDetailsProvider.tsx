import { useState } from 'react'
import type { BookModel } from '../BookModel'
import type { ClientModel } from '../Clients/ClientModel'

export const useBookDetailsProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [bookInfo, setBookInfo] = useState<{book: BookModel, clients: ClientModel[], purchaseCount: number} | null>(null) 

  const loadBook = () => {
    setIsLoading(true)
    fetch(`http://localhost:3000/books/${id}`)
      .then(response => response.json())
      .then(data => {console.log("response", data);
      setBookInfo(data.data)})
      .finally(() => setIsLoading(false))

  }

  return { isLoading, bookInfo, loadBook }
}
