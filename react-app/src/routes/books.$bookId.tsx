import { createFileRoute } from '@tanstack/react-router'
import { BookDetails } from '../modules/components/BookDetails'

export const Route = createFileRoute('/books/$bookId')({
  component: BookDetailsPage,
})

function BookDetailsPage() {
  const { bookId } = Route.useParams()

  return <BookDetails id={bookId} />
}
