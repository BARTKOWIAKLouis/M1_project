import { createFileRoute } from '@tanstack/react-router'
import { BooksPage } from '../../modules/pages/BooksPage'

export const Route = createFileRoute('/books/')({
  component: BooksPage,
})
