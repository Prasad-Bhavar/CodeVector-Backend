import { AppDataSource } from "../../config/data-source";

import { seedCategories } from "./categorySeeder";
import { seedProducts } from "./productSeeder";

async function run() {
    await AppDataSource.initialize();

    await seedCategories();

    await seedProducts();

    process.exit(0);
}

run();