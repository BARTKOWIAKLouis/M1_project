import { useState } from 'react'
import type {
  ClientModel,
  CreateClientModel,
  UpdateClientModel,
} from '../ClientModel'
import axios from 'axios'

export const useClientProvider = () => {
  const [clientList, setClientList] = useState<
    Array<{ client: ClientModel; purchaseCount: number }>
  >([])

  const loadClients = () => {
    fetch('http://localhost:3000/clients')
      .then(response => response.json())
      .then(data => {
        setClientList(data.data)
      })
      .catch(err => console.error(err))
  }

  const createClient = (client: CreateClientModel) => {
    console.log(client)
    axios
      .post('http://localhost:3000/clients', client)
      .then(() => {
        //Refresh the client list after creating a new client
        loadClients()
      })
      .catch(err => console.error(err))
  }

  const updateClient = (id: string, input: UpdateClientModel) => {
    axios
      .patch(`http://localhost:3000/clients/${id}`, input)
      .then(() => {
        //Refresh the client list after update
        loadClients()
      })
      .catch(err => console.error(err))
  }

  const deleteClient = (id: string) => {
    axios
      .delete(`http://localhost:3000/clients/${id}`)
      .then(() => {
        //Refresh the client list after delete
        loadClients()
      })
      .catch(err => console.error(err))
  }

  return { clientList, loadClients, createClient, updateClient, deleteClient }
}
