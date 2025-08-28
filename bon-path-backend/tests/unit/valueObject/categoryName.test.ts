import { describe, expect, it } from "vitest";
import { CategoryName } from "@valueObject";
import { ERROR_MESSAGES } from "@constants/errorMessages";

describe("categoryName VOのテスト", () => {
    it('非文字列が不正であること', () => {
        expect(() => new CategoryName(124)).toThrowError(ERROR_MESSAGES.valueObjects.categoryName.stringError);
    })

    it('空文字が不正であること', () => {
        expect(() => new CategoryName("")).toThrowError(ERROR_MESSAGES.valueObjects.categoryName.minError);
    })

    it('1文字以上であること', () => {
        expect(() => new CategoryName("a".repeat(1))).not.toThrowError();
    })

    it('valueメソッドが与えられた値を返すこと', () => {
        const categoryName = new CategoryName("CategoryName");
        expect(categoryName.value).toBe("CategoryName");
    })

    it('equalsメソッドが同じ値のCategoryNameに対してtrueを返すこと', () => {
        const CategoryName1 = new CategoryName("CategoryName");
        const CategoryName2 = new CategoryName("CategoryName");
        expect(CategoryName1.equals(CategoryName2)).toBe(true);
    })
})