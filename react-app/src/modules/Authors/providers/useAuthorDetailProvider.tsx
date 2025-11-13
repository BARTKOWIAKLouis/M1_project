import { useState } from 'react'
import type { AuthorModel } from '../AuthorModel'
import type { BookModel } from '../../Books/BookModel'
import type { UpdateAuthorModel } from '../AuthorModel'
import axios from 'axios'

export const useAuthorDetailProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [authorInfo, setAuthorInfo] = useState<{
    author: AuthorModel
    writtenBooks: BookModel[]
    totalCount: number
    AverageSales: number
  } | null>(null)

  const loadAuthorDetail = () => {
    setIsLoading(true)
    fetch(`http://localhost:3000/authors/${id}`)
      .then(response => response.json())
      .then(data => setAuthorInfo(data.data))
      .finally(() => setIsLoading(false))
  }

  const updateAuthor = (id: string, input: UpdateAuthorModel) => {
    axios
      .patch(`http://localhost:3000/authors/${id}`, input)
      .catch(err => console.error(err))
  }

  return { isLoading, authorInfo, loadAuthorDetail, updateAuthor }
}
