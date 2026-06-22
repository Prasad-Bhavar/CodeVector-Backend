import { AppDataSource } from "../../config/data-source";
import { Category } from "../../modules/categories/category.entity";

export async function seedCategories() {
    const repo = AppDataSource.getRepository(Category);

    const existing = await repo.count();

    if (existing > 0) {
        console.log("Categories already seeded");
        return;
    }

    const categories = [
        "Electronics",
        "Fashion",
        "Books",
        "Sports",
        "Home",
        "Beauty",
        "Toys",
        "Automotive",
    ];

    await repo.save(
        categories.map((name) => ({
            name,
        }))
    );

    console.log("Categories seeded");
}