import { useEffect } from 'react'
import { useAuthorsProviders } from '../providers/useAuthorsProviders'
import { AuthorListItem } from './AuthorListItem'
// import { CreateAuthorModal } from './CreateAuthorModal'

export function AuthorList() {
  const { authorList, loadAuthors, createAuthor, deleteAuthor } =
    useAuthorsProviders()

  useEffect(() => {
    loadAuthors()
  }, [])

  return (
    <>
      {/* <CreateAuthorModal onCreate={createAuthor} /> */}

      {/* List all books items with its number of sales */}
      <div style={{ padding: '0 .5rem' }}>
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
