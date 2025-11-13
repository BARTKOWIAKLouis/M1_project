import { useState } from 'react'
import type { BookModel, CreateBookModel } from '../BookModel'
import axios from 'axios'

export const useBookProvider = () => {
  const [bookList, setBookList] = useState<
    Array<{ Books: BookModel; Sales_count: number }>
  >([])

  const loadBooks = () => {
    axios
      .get('http://localhost:3000/books')
      .then(data => {
        setBookList(data.data.data)
      })
      .catch(err => console.error(err))
  }

  const createBook = (book: CreateBookModel) => {
    axios
      .post('http://localhost:3000/books', book)
      .then(() => {
        //Refresh the book list after creating a new book
        loadBooks()
      })
      .catch(err => console.error(err))
  }

  const deleteBook = (id: string) => {
    axios
      .delete(`http://localhost:3000/books/${id}`)
      .then(() => {
        //Refresh the book list after delete
        loadBooks()
      })
      .catch(err => console.error(err))
  }

  return { bookList, loadBooks, createBook, deleteBook }
}
