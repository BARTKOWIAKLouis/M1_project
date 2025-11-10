import { Outlet } from '@tanstack/react-router'
import { BookList } from '../Books/components/BookList'

export function BooksPage() {
  return (
    <div>
      <BookList />
      <Outlet />
    </div>
  )
}
