import { AppDataSource } from "../../config/data-source";
import { Category } from "./category.entity";

export class CategoryRepository {
    private repository = AppDataSource.getRepository(Category);

    async findAll() {
        return this.repository
            .createQueryBuilder("category")
            .orderBy("category.name", "ASC")
            .getMany();
    }

    async findById(id: number) {
        return this.repository.findOne({
            where: { id },
        });
    }
}