import { ProductRepository } from "./product.repository";
import { encodeCursor } from "../../utils/cursor";

export class ProductService {
    private repository =
        new ProductRepository();

    async getProducts(
        limit: number,
        categoryId?: number,
        cursor?: string,
        search?: string
    ) {
        const products =
            await this.repository.getProducts(
                limit,
                categoryId,
                cursor,
                search
            );

        let nextCursor = null;

        if (products.length > limit) {
            const lastItem = products[limit - 1];

            nextCursor = encodeCursor({
                createdAt:
                    lastItem.createdAt.toISOString(),
                id: lastItem.id,
            });

            products.pop();
        }

        return {
            products,
            nextCursor,
        };
    }
}