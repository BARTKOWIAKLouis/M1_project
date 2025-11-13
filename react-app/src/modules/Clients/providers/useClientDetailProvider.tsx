import { useState } from 'react'
import type { ClientModel, UpdateClientModel } from '../ClientModel'
import type { BookModel } from '../../Books/BookModel'
import axios from 'axios'

export const useClientDetailProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [clientInfo, setClientInfo] = useState<{
    client: ClientModel
    purchasedBooks: BookModel[]
  } | null>(null)

  const loadClient = () => {
    setIsLoading(true)
    fetch(`http://localhost:3000/clients/${id}`)
      .then(response => response.json())
      .then(data => setClientInfo(data.data))
      .finally(() => setIsLoading(false))
  }

  const updateclient = async (id: string, input: UpdateClientModel) => {
      setIsLoading(true)
      try {
        const res = await axios.patch(`http://localhost:3000/clients/${id}`, input)
        // after update, reload fresh book details (backend may not return same shape)
        await loadClient()
        return res
      } catch (err) {
        console.error(err)
        throw err
      } finally {
        setIsLoading(false)
      }
    }

  return { isLoading, clientInfo, loadClient, updateclient }
}
