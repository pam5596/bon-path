import { CategoryName, Id, CreatedAt } from "@models/valueObject";

export type CategoryType = {
    readonly parentId: Id
    name: CategoryName
    readonly createdAt?: CreatedAt
}