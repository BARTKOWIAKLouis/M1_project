import { ClientId } from './clients.entity';

export type ClientModel = {
  id: ClientId;
  firstName: string;
  lastName: string;
  email?: string;
  picture?: string;
};

export type CreateClientModel = {
  firstName: string;
  lastName: string;
  email?: string;
  picture?: string;
};

export type UpdateClientModel = Partial<CreateClientModel>;

export type FilterClientModel = {
  limit: number;
  offset: number;
  sort?: Partial<Record<keyof ClientModel, 'ASC' | 'DESC'>>;
};

export type GetClientModel = {
  totalCount: number;
  data: { client: ClientModel; purchaseCount: number }[];
};
