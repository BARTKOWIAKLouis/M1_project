import { useState } from 'react'
import axios from 'axios'
import type { AuthorModel, CreateAuthorModel, UpdateAuthorModel } from '../AuthorModel'

export const useAuthorsProviders = () => {
  const [authorList, setAuthors] = useState<Array<{Authors: AuthorModel, Number_of_Books: number}>>([])

  const loadAuthors = () => {
    axios
      .get('http://localhost:3000/authors')
      .then(data => {
        setAuthors(data.data.data)
      })
      .catch(err => console.error(err))
  }

  const createAuthor = (author: CreateAuthorModel) => {
    axios
      .post('http://localhost:3000/authors', author)
      .then(() => {
        //Refresh the author list after creating a new author
        loadAuthors()
      })
      .catch(err => console.error(err))

  }

  const updateAuthor = (id:string , input: UpdateAuthorModel) => {
    axios
      .patch(`http://localhost:3000/authors/${id}`, input)
      .then(() => {
        //Refresh the author list after update
        loadAuthors()
      })
      .catch(err => console.error(err))
  }

  const deleteAuthor = (id: string) => {
    axios
      .delete(`http://localhost:3000/authors/${id}`) 
      .then(() => {
        //Refresh the author list after delete
        loadAuthors()
      })
      .catch(err => console.error(err))
  }

  return { authorList, loadAuthors, createAuthor, updateAuthor, deleteAuthor }
}
