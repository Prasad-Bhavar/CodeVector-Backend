import { faker } from "@faker-js/faker";

import { AppDataSource } from "../../config/data-source";
import { Product } from "../../modules/products/product.entity";
import { Category } from "../../modules/categories/category.entity";

const TOTAL_PRODUCTS = 20000;
const BATCH_SIZE = 5000;

export async function seedProducts() {
    const productRepo =
        AppDataSource.getRepository(Product);

    const count = await productRepo.count();

    if (count > 0) {
        console.log("Products already seeded");
        return;
    }

    const categories =
        await AppDataSource.getRepository(Category).find();

    let inserted = 0;

    while (inserted < TOTAL_PRODUCTS) {
        const batch: any[] = [];

        for (
            let i = 0;
            i < BATCH_SIZE &&
            inserted < TOTAL_PRODUCTS;
            i++
        ) {
            inserted++;

            const category =
                categories[
                Math.floor(
                    Math.random() * categories.length
                )
                ];

            batch.push({
                name: faker.commerce.productName(),

                description: faker.commerce.productDescription(),

                price: faker.number.float({
                    min: 100,
                    max: 100000,
                    fractionDigits: 2,
                }),

                category,

                createdAt: faker.date.past(),

                updatedAt: new Date(),
            });
        }

        await productRepo.insert(batch);

        console.log(
            `${inserted}/${TOTAL_PRODUCTS} inserted`
        );
    }

    console.log("Products seeded");
}