import { Outlet } from '@tanstack/react-router'
import { AuthorList } from '../Authors/components/AuthorList'

export function AuthorsPage() {
  return (
    <div>
      <AuthorList />
      <Outlet />
    </div>
  )
}
