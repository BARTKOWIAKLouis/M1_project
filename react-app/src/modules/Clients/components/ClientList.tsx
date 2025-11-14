import { useEffect, useState } from 'react'
import { useClientProvider } from '../providers/useClientProvider'
import { ClientListItem } from './ClientListItem'
import { CreateClientModal } from './CreateClientModal'
import SearchBar from '../../SearchBar'

export function ClientList() {
  const { clientList, loadClients, createClient, deleteClient } =
    useClientProvider()
    const [query, setQuery] = useState('')

    const filteredList = (clientList ?? []).filter(item => {
      const name = `${item.client.firstName} ${item.client.lastName}`.toLowerCase()
      const q = query.trim().toLowerCase()
      if (!q) return true
      return name.includes(q)
    })
  useEffect(() => {
    loadClients()
  }, [])

  return (
    <>
      <div style={{ display: 'flex',padding:'0 2em', justifyContent:'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search by name"
        />
        <CreateClientModal onCreate={createClient} />
      </div>
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
        {filteredList.length != 0 ? (
          filteredList.map(item => (
            <ClientListItem
              key={item.client.id}
              client={item.client}
              purchaseCount={item.purchaseCount}
              onDelete={deleteClient}
            />
          ))
        ) : (
          <div style={{ margin: '2em auto' }}>No clients founds</div>
        )}
      </div>
    </>
  )
}
