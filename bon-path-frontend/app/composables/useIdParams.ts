import z from "zod"

export default function(names: string[]) {
    const route = useRoute()

    const object_schema = z.strictObject(
        Object.fromEntries(
            names.map(
                name => [name, IdValueObject.schema()]
            )
        )
    )

    const result = object_schema.safeParse(route.params)
    if (!result.success) throw createError({
        statusCode: 400,
        statusMessage: result.error.issues.map(
            (issue) => issue.message
        ).join(' / ')
    })

    return result.data
}