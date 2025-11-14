import { useEffect } from 'react'
import { useAuthorsProviders } from '../providers/useAuthorsProviders'
import { AuthorListItem } from './AuthorListItem'
import { CreateAuthorModal } from './CreateAuthorModal'

export function AuthorList() {
  const { authorList, loadAuthors, createAuthor, deleteAuthor } =
    useAuthorsProviders()

  useEffect(() => {
    loadAuthors()
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
      <CreateAuthorModal onCreate={createAuthor} />

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
        {authorList.map(item => (
          <AuthorListItem
            key={item.Authors.id}
            author={item.Authors}
            Number_of_Books={item.Number_of_Books}
            onDelete={deleteAuthor}
          />
        ))}
      </div>
    </>
  )
}
