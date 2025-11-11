import { createFileRoute } from '@tanstack/react-router'
import { ClientsPage } from '../../modules/pages/ClientsPage'

export const Route = createFileRoute('/clients/')({
  component: ClientsPage,
})
