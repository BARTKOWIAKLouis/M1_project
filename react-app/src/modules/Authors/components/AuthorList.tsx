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
      .scrollable-authors::-webkit-scrollbar {
        width: 0.8vw;
      }

      .scrollable-authors::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 1vw;
        transition: background-color 0.3s;
      }

      .scrollable-authors::-webkit-scrollbar-thumb:hover {
        background-color: rgba(255, 255, 255, 0.6);
      }

      .scrollable-authors::-webkit-scrollbar-track {
        background: transparent;
      }

      .scrollable-authors {
        position: relative;
      }

      .scrollable-authors::after {
        content: '';
        position: sticky;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2vh;
        background: linear-gradient(to bottom, transparent, rgba(101, 50, 57, 0.9));
        pointer-events: none;
      }
      `}
      </style>

      <CreateAuthorModal onCreate={createAuthor} />

      <div
        style={{
          padding: '0 1vw',
          marginTop: '2vh',
          height: '70vh',
          overflowY: 'auto',
          paddingLeft: '2vw',
          paddingRight: '2vw',
          scrollbarWidth: 'thin',
          scrollbarColor: '#b37a7a transparent',
          width: '95%',
          marginLeft: '0.5%',
          backgroundColor: 'rgba(255, 255, 255, 0.27)',
          borderRadius: '1vw',
        }}
        className="scrollable-authors"
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
