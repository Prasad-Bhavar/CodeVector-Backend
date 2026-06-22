import { AppDataSource } from "../../config/data-source";
import { Product } from "./product.entity";
import { decodeCursor } from "../../utils/cursor";

export class ProductRepository {
    private repository =
        AppDataSource.getRepository(Product);

    async getProducts(
        limit: number,
        categoryId?: number,
        cursor?: string,
        search?: string
    ) {
        const qb = this.repository
            .createQueryBuilder("product")
            .leftJoinAndSelect(
                "product.category",
                "category"
            )
            .orderBy(
                "product.createdAt",
                "DESC"
            )
            .addOrderBy(
                "product.id",
                "DESC"
            )
            .take(limit + 1);

        if (categoryId) {
            qb.andWhere(
                "category.id = :categoryId",
                {
                    categoryId,
                }
            );
        }

        if (search?.trim()) {
            qb.andWhere(
                `
      LOWER(product.name)
      LIKE LOWER(:search)
      `,
                {
                    search: `%${search}%`,
                }
            );
        }

        if (cursor) {
            const decoded =
                decodeCursor(cursor);

            qb.andWhere(
                `
      (
        product.createdAt < :createdAt
        OR
        (
          product.createdAt = :createdAt
          AND product.id < :id
        )
      )
      `,
                {
                    createdAt:
                        decoded.createdAt,
                    id: decoded.id,
                }
            );
        }

        return qb.getMany();
    }
}