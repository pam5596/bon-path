import { z } from "zod";
import BaseEntity from "../_abstruct";
import type { CategoryType } from "./type";
import { CreatedAt, Id, CategoryName } from "@models/valueObject";

export default class CategoryEntity extends BaseEntity<CategoryType> {
    constructor(values: CategoryType, id?: Id) {
        super(values, CategoryEntity.schema(), id)
    }

    static schema() {
        return z.strictObject({
            parentId: z.instanceof(Id).optional(),
            name: z.instanceof(CategoryName)
        })
    }

    get parentId() {
        return this._values.parentId
    }
}