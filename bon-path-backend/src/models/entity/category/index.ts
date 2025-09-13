import { z } from "zod";
import BaseEntity from "../_abstruct";
import { AsPrimitives } from "../_to_primitives";
import type { CategoryType } from "./type";
import { Id, CategoryName } from "@models/valueObject";

export default class CategoryEntity extends BaseEntity<CategoryType> {
    constructor(valueObjects: CategoryType & { id?: Id }) {
        const { id, ...values } = valueObjects;
        super(values, CategoryEntity.schema(), id)
    }

    static schema() {
        return z.strictObject({
            parentId: z.instanceof(Id).optional(),
            name: z.instanceof(CategoryName)
        })
    }

    static fromPrimitives(primitives: AsPrimitives<CategoryType> & { id?: number }) {
        return new CategoryEntity({
            id: primitives.id ? new Id(primitives.id) : undefined,
            parentId: primitives.parentId ? new Id(primitives.parentId) : undefined,
            name: new CategoryName(primitives.name)
        })
    }

    get parentId() {
        return this._values.parentId
    }
}