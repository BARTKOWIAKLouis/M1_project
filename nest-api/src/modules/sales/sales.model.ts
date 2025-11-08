import { SaleId } from "./sales.entity";

export type SaleModel = {
    id: SaleId;
    clientId: string;
    bookId: string;
    saleDate: Date;
};

export type CreateSaleModel = {
    clientId: string;
    bookId: string;
    saleDate: Date;
};