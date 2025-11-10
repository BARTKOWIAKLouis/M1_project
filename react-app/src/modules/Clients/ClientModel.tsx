export type ClientModel = {
  id: string
  firstName: string
  lastName: string
  email?: string
  picture?: string
}

export type CreateClientModel = {
  firstName: string
  lastName: string
  email?: string
  picture?: string
}

export type UpdateClientModel = Partial<CreateClientModel>
