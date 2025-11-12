import type { ZodType } from "zod";

export default function (rule: ZodType) {
    return (value: unknown) => {
        const result = rule.safeParse(value)

        if (!result.success) return result.error.issues[0]!.message
        return result.success
    }
}