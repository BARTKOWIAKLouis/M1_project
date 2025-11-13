import axios from "axios"
import type { CreateSaleModel } from "../SaleModel"

export const useSaleProvider = () => {
    const createSale = (sale: CreateSaleModel) =>{
        console.log("Sending sale creation request:", sale); // Debugging
        axios
        .post("http://localhost:3000/sales", sale)
        .catch(err => console.error(err))
    }
    return { createSale }
}