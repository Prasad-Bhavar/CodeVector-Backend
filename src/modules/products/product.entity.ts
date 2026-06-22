import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from "typeorm";
import { Category } from "../categories/category.entity";

@Entity("products")
@Index("idx_products_created_id", ["createdAt", "id"])
@Index("idx_products_category_created_id", [
    "category",
    "createdAt",
    "id",
])
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column("text")
    description!: string;

    @Column("decimal", {
        precision: 10,
        scale: 2,
    })
    price!: number;

    @ManyToOne(() => Category)
    @JoinColumn({
        name: "category_id",
    })
    category!: Category;

    @CreateDateColumn({
        name: "created_at",
    })
    createdAt!: Date;

    @UpdateDateColumn({
        name: "updated_at",
    })
    updatedAt!: Date;
}