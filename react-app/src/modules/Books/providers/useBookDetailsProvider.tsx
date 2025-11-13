import { useState } from 'react'
import axios from 'axios'
import type { BookModel, UpdateBookModel } from '../BookModel'
import type { ClientModel } from '../../Clients/ClientModel'

export const useBookDetailsProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [bookInfo, setBookInfo] = useState<{
    book: BookModel
    clients: ClientModel[]
    purchaseCount: number
  } | null>(null)

  const loadBook = () => {
    setIsLoading(true)
    fetch(`http://localhost:3000/books/${id}`)
      .then(response => response.json())
      .then(data => setBookInfo(data.data))
      .finally(() => setIsLoading(false))
  }

  const updateBook = async (id: string, input: UpdateBookModel) => {
    setIsLoading(true)
    try {
      const res = await axios.patch(`http://localhost:3000/books/${id}`, input)
      // after update, reload fresh book details (backend may not return same shape)
      await loadBook()
      return res
    } catch (err) {
      console.error(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, bookInfo, loadBook, updateBook }
}
