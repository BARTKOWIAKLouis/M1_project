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
        {clientList ? (
          clientList.map(item => (
            <ClientListItem
              key={item.client.id}
              client={item.client}
              purchaseCount={item.purchaseCount}
              onDelete={deleteClient}
            />
          ))
        ) : (
          <div style={{ margin: 'auto' }}>No clients founds</div>
        )}
      </div>
    </>
  )
}
