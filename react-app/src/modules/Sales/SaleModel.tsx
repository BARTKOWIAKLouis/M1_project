export type SaleModel = {
    id: string;
    clientId: string;
    bookId: string;
    saleDate: Date;
}

export type CreateSaleModel = {
    clientId: string;
    bookId: string;
    saleDate: Date;
}