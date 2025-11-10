import axios from "axios"
import type { CreateSaleModel } from "../SaleModel"

export const useSaleProviders = () => {
    const createSale = (sale: CreateSaleModel) =>{
        axios
        .post("http://localhost:3000/sales", sale)
        .catch(err => console.error(err))
    }
    return { createSale }
}