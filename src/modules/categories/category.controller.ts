import { Request, Response } from "express";
import { CategoryService } from "./category.service";

export class CategoryController {
    private service = new CategoryService();

    getCategories = async (
        req: Request,
        res: Response
    ) => {
        try {
            const categories =
                await this.service.getCategories();

            return res.status(200).json({
                success: true,
                data: categories,
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                success: false,
                message: "Failed to fetch categories",
            });
        }
    };
}