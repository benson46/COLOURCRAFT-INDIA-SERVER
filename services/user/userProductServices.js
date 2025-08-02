import { productRepository } from "../../repositories/productRepository.js"

export const userProductServices = {
    fetchProducts : async () => {
        try {
            return await productRepository.findAllProducts();
        } catch (error) {
            throw error
        }
    }
}