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
    averageSales: number
  } | null>(null)

  const loadAuthorDetail = () => {
    setIsLoading(true)
    fetch(`http://localhost:3000/authors/${id}`)
      .then(response => response.json())
      .then(data => setAuthorInfo(data.data))
      .finally(() => setIsLoading(false))
  }

  const updateAuthor = async (id: string, input: UpdateAuthorModel) => {
    setIsLoading(true)
    try {
      const res = await axios.patch(
        `http://localhost:3000/authors/${id}`,
        input,
      )
      await loadAuthorDetail() // reload fresh author details
      return res
    } catch (err) {
      console.error(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, authorInfo, loadAuthorDetail, updateAuthor }
}
