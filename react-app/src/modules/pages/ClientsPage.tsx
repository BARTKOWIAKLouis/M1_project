import { Outlet } from '@tanstack/react-router'
import { ClientList } from '../Clients/components/ClientList'

export function ClientsPage() {
  return (
    <div>
      <ClientList />
      <Outlet />
    </div>
  )
}
