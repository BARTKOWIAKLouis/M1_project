import { createFileRoute } from '@tanstack/react-router'
import { AuthorDetails } from '../../modules/Authors/components/AuthorDetails'

export const Route = createFileRoute('/authors/$authorId')({
  component: AuthorDetailsPage,
})

function AuthorDetailsPage() {
  const { authorId } = Route.useParams()

  return <AuthorDetails id={authorId} />
}
