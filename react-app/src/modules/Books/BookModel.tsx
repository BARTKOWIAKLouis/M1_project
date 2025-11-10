export type BookModel = {
  id: string
  title: string
  yearPublished: number
  author: {
    id: string
    firstName: string
    lastName: string
  }
  picture?: string
}

export type CreateBookModel = {
  authorId: string
  title: string
  yearPublished: number
  picture?: string
}

export type UpdateBookModel = Partial<CreateBookModel>
