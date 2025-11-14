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
          width: '95vw',
          marginLeft: '.5vw',
          backgroundColor: 'rgba(255, 255, 255, 0.27)',
          borderRadius: '1vw',
        }}
        className="scrollable-books"
      >
        {clientList && clientList.length > 0 ? (
          clientList.map(item => (
            <ClientListItem
              key={item.client.id}
              client={item.client}
              purchaseCount={item.purchaseCount}
              onDelete={deleteClient}
            />
          ))
        ) : (
          <div
            style={{ textAlign: 'center', marginTop: '2vh', color: 'white' }}
          >
            No clients found
          </div>
        )}
      </div>
    </>
  )
}
