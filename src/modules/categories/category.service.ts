import { CategoryRepository } from "./category.repository";

export class CategoryService {
    private repository = new CategoryRepository();

    async getCategories() {
        return this.repository.findAll();
    }
}