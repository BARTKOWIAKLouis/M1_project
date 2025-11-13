import { useEffect } from 'react'
import { useBookProvider } from '../providers/useBookProvider'
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
      <style>
        {`
      .scrollable-books::-webkit-scrollbar {
  width: 8px;
}

.scrollable-books::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  transition: background-color 0.3s;
}

.scrollable-books::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.6);
}

.scrollable-books::-webkit-scrollbar-track {
  background: transparent;
}
  .scrollable-books {
  position: relative;
}

.scrollable-books::after {
  content: '';
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  height: 24px;
  background: linear-gradient(to bottom, transparent, rgba(101, 50, 57, 0.9));
  pointer-events: none;
}
`}
      </style>
      <CreateBookModal onCreate={createBook} />

      {/* List all books items with its number of sales */}
      <div
        style={{
          padding: '0 .5rem',
          marginTop: '20px',
          maxHeight: '100%',
          overflowY: 'auto',
          paddingLeft: '30px',
          paddingRight: '20px',
          scrollbarWidth: 'thin',
          scrollbarColor: '#b37a7a transparent',
          width: '95%',
          marginLeft: '0',
        }}
        className="scrollable-books"
      >
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
