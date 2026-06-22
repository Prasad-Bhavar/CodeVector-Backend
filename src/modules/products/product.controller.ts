import { Request, Response } from "express";
import { ProductService } from "./product.service";

export class ProductController {
    private service = new ProductService();

    getProducts = async (
        req: Request,
        res: Response
    ) => {
        try {
            const limit =
                Number(req.query.limit) || 20;

            const categoryId = req.query.categoryId
                ? Number(req.query.categoryId)
                : undefined;

            const cursor = req.query.cursor
                ? String(req.query.cursor)
                : undefined;

            const search = req.query.search
                ? String(req.query.search)
                : undefined;

            const result =
                await this.service.getProducts(
                    limit,
                    categoryId,
                    cursor,
                    search
                );

            return res.status(200).json({
                success: true,
                data: result.products,
                meta: {
                    limit,
                    nextCursor:
                        result.nextCursor,
                },
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                success: false,
                message:
                    "Failed to fetch products",
            });
        }
    };
}