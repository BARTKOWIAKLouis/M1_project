import { useEffect } from 'react'
import { useBookProvider } from '../Books/providers/useBookProvider'
import { BookListItem } from './BookListItem'
import { CreateBookModal } from './CreateBookModal'

export function BookList() {
  const { bookList, loadBooks, deleteBook, updateBook, createBook } =
    useBookProvider()

  useEffect(() => {
    loadBooks()
  }, [])

  return (
    <>
      <CreateBookModal onCreate={createBook} />

      {/* List all books items with its number of sales */}
      <div style={{ padding: '0 .5rem' }}>
        {bookList.map(item => (
          <BookListItem
            key={item.Books.id}
            book={item.Books}
            sales_count={item.Sales_count}
            onDelete={deleteBook}
            onUpdate={updateBook}
          />
        ))}
      </div>
    </>
  )
}
