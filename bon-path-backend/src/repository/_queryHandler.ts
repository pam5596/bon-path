import { RepositoryError } from "@lib/error"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";

export default function queryHandler (
    queryMethod: Function,
    context: ClassMemberDecoratorContext
) {
    return async function (this: any, ...args: any[]) {
        try {
            return await queryMethod.apply(this, args);
        } catch(e) {
            if (e instanceof PrismaClientKnownRequestError) {
                throw new RepositoryError(
                    ERROR_MESSAGES.repository.detail,
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

