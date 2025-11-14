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
    const author = `${item.Books.author.firstName} ${item.Books.author.lastName}`.toLowerCase()
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
      <div style={{ display: 'flex',padding:'0 2em', justifyContent:'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search by title or author"
        />
        <CreateBookModal onCreate={createBook} />

      </div>

      {/* List all books items with its number of sales */}
      <div
        style={{
          padding: '0 .5rem',
          marginTop: '20px',
          height: '70vh',
          overflowY: 'auto',
          paddingLeft: '30px',
          paddingRight: '20px',
          scrollbarWidth: 'thin',
          scrollbarColor: '#b37a7a transparent',
          width: '95%',
          marginLeft: '0.5%',
          backgroundColor: 'rgba(255, 255, 255, 0.27)',
          borderRadius: '8px',
        }}
        className="scrollable-books"
      >
        { filteredList.length != 0 ? (
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
