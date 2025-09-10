import { CategoryName, Id } from "@models/valueObject";

export type CategoryType = {
    readonly parentId?: Id
    name: CategoryName
}