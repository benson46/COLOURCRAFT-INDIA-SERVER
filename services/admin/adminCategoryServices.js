import { categoryRepository } from "../../repositories/categoryRepository.js";
import createError from "../../utils/createError.js";
import { isValidTitle } from "../../utils/validators.js";

export const adminCategoryServices = {
    getAllCategory: async()=>{
        try {
            return await categoryRepository.findAllCategory();
        } catch (error) {
            
        }
    },
    addNewCategory: async(title) =>{
        try {
            const validateError = isValidTitle(title);
            if(validateError) throw createError.BadRequest(validateError)
    
            const trimmedTitle =  title.trim();
    
            const existingTitle = await categoryRepository.findCategoryByTitle(trimmedTitle) 

            if(existingTitle){
                const error =  createError.Conflict('This category already exist');
                error.details ={
                    suggestion:"Change the title",
                    errType: "DUPLICATE_TITLE"
                };
                throw error;
            }

            const newCategory = await categoryRepository.newCategory(title);
            return newCategory
        } catch (error) {
            throw error;
        }
    }
}