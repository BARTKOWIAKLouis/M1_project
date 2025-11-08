import { useState } from 'react'
import type { BookModel, CreateBookModel, UpdateBookModel } from '../BookModel'
import type { ClientModel } from '../Clients/ClientModel'
import axios from 'axios'

export const useBookProvider = () => {
  const [bookList, setBookList] = useState<Array<{Books:BookModel, Sales_count:number}>>([])
  const [bookInfo, setBookInfo] = useState<{book: BookModel, clients: ClientModel[], purchaseCount: number} | null>(null) 

  const loadBooks = () => {
    axios
      .get('http://localhost:3000/books')
      .then(data => {
        setBookList(data.data.data )
      })
      .catch(err => console.error(err))
  }

  const getBookInfo = (id: string) => {
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then(data => {
        setBookInfo(data.data.data)
      })
      .catch(err => console.error(err))
  }

  const createBook = (book: CreateBookModel) => {
    axios
      .post('http://localhost:3000/books', book)
      .then(() => {
        loadBooks()
      })
      .catch(err => console.error(err))
  }

  const updateBook = (id: string, input: UpdateBookModel) => {
    axios
      .patch(`http://localhost:3000/books/${id}`, input)
      .then(() => {
        loadBooks()
      })
      .catch(err => console.error(err))
  }

  const deleteBook = (id: string) => {
    axios
      .delete(`http://localhost:3000/books/${id}`)
      .then(() => {
        loadBooks()
      })
      .catch(err => console.error(err))
  }

  return { bookList, bookInfo, loadBooks, getBookInfo, createBook, updateBook, deleteBook }
}
