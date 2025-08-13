import { categoryRepository } from "../../repositories/categoryRepository.js"

export const userCategoryServices = {
    fetchCategories: async () => {
        try {
            return await categoryRepository.findAllCategory();
        } catch (error) {
            throw error;
        }
    }
}