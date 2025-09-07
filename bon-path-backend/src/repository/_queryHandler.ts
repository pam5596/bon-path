import { RepositoryError } from "@error"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export default function queryHandler(
    errorDetail: string
) {
    return function (
        queryMethod: Function,
        context: ClassMemberDecoratorContext
    ) {
        return async function (this: any, ...args: any[]) {
            try {
                return await queryMethod.apply(this, args);
            } catch(e) {
                if (e instanceof PrismaClientKnownRequestError) {
                    throw new RepositoryError(
                        errorDetail,
                        e.code,
                        e.message,
                        this.constructor.name,
                        context.name,
                        args
                    )
                } else {
                    throw e
                }
            }
        }
    }
}

