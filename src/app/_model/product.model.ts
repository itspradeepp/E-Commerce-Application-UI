import { FileHandle } from "./file-handle.model";

export interface Product {
    productName: String,
    productDescription: String,
    productDiscountedPrice: Number,
    productActualPrice: Number,
    productImages: FileHandle[]

}