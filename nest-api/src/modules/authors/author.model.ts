import { AuthorId } from './author.entity';

export type AuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
};

export type CreateAuthorModel = {
  firstName: string;
  lastName: string;
};

export type UpdateAuthorModel = Partial<CreateAuthorModel>;

export type FilterAuthorModel = {
  limit: number;
  offset: number;
  sort?: Partial<Record<keyof AuthorModel, 'ASC' | 'DESC'>>;
}

export type GetAuthorsModel = {
  totalCount: number;
  data: {Authors: AuthorModel, Number_of_Books: number}[];
}
