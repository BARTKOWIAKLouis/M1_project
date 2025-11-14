import { useEffect, useState } from 'react'
import { useBookProvider } from '../providers/useBookProvider'
import { BookListItem } from './BookListItem'
import { CreateBookModal } from './CreateBookModal'
import SearchBar from '../../SearchBar'

export function BookList() {
  const { bookList, loadBooks, deleteBook, createBook } = useBookProvider()
  const [query, setQuery] = useState('')

  const filteredList = (bookList ?? []).filter(item => {
    const title = item.Books.title?.toLowerCase() ?? ''
    const author =
      `${item.Books.author.firstName} ${item.Books.author.lastName}`.toLowerCase()
    const q = query.trim().toLowerCase()
    if (!q) return true
    return title.includes(q) || author.includes(q)
  })

  useEffect(() => {
    loadBooks()
  }, [])

  return (
    <>
      <style>
        {`
          .scrollable-books::-webkit-scrollbar {
            width: 0.5vw;
          }
          .scrollable-books::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 1vw;
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
            height: 3vh;
            background: linear-gradient(to bottom, transparent, rgba(101, 50, 57, 0.9));
            pointer-events: none;
          }
        `}
      </style>
      <div
        style={{
          display: 'flex',
          padding: '0 2em',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search by title or author"
        />
        <CreateBookModal onCreate={createBook} />
      </div>

      <div
        style={{
          padding: '1vh 1vw',
          marginTop: '2vh',
          height: '70vh',
          overflowY: 'auto',
          width: '95vw',
          marginLeft: '2.5vw',
          backgroundColor: 'rgba(255, 255, 255, 0.27)',
          borderRadius: '1vw',
          scrollbarWidth: 'thin',
          scrollbarColor: '#b37a7a transparent',
        }}
        className="scrollable-books"
      >
        {filteredList.length != 0 ? (
          filteredList.map(item => (
            <BookListItem
              key={item.Books.id}
              book={item.Books}
              sales_count={item.Sales_count}
              onDelete={deleteBook}
            />
          ))
        ) : (
          <div style={{ margin: '2em auto' }}>No books found</div>
        )}
      </div>
    </>
  )
}
