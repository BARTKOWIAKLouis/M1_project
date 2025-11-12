import { useEffect } from 'react'
import { useClientProvider } from '../providers/useClientProvider'
import { ClientListItem } from './ClientListItem'
import { CreateClientModal } from './CreateClientModal'

export function ClientList() {
  const { clientList, loadClients, createClient, deleteClient } =
    useClientProvider()

  useEffect(() => {
    loadClients()
  }, [])

  return (
    <>
      <CreateClientModal onCreate={createClient} />

      {/* List all clients items with its number of sales */}
      <div style={{ padding: '0 .5rem' }}>

        { clientList ? (
        clientList.map(item => (
          <ClientListItem
            key={item.client.id}
            client={item.client}
            purchaseCount={item.purchaseCount}
            onDelete={deleteClient}
          />
        ))) : (
          <div style={{margin: 'auto'}}>No clients founds</div>
        )}
      </div>
    </>
  )
}
