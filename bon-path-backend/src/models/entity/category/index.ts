import { z } from "zod";
import BaseEntity from "../_abstruct";
import type { CategoryType } from "./type";
import { CreatedAt, Id, CategoryName } from "@models/valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export default class CategoryEntity extends BaseEntity<CategoryType> {
    constructor(values: CategoryType, id?: Id) {
        super(values, CategoryEntity.schema(), id)
    }

    static schema() {
        return z.strictObject({
            parentId: z.instanceof(Id, { error: ERROR_MESSAGES.entity.category.parentIdInstanceofError }),
            name: z.instanceof(CategoryName, { error: ERROR_MESSAGES.entity.category.nameInstanceofError }),
            createdAt: z.instanceof(CreatedAt, { error: ERROR_MESSAGES.entity._share.createdAt }).optional()
        })
    }

    get parentId() {
        return this._values.parentId
    }
}