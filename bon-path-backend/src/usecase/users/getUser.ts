import BaseUseCase from "@usecase/_interface";
import { UserPayloads } from "@share/payloads";
import { UsersPayloadSchemas } from "@payload";
import { HonoJwtClient } from "@client";
import { UserRepository } from "@repository";
import { LoginSessionEntity } from "@models/entity";
import { UseCaseError } from "@lib/error";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";

export class GetUserUseCase implements BaseUseCase<
    UserPayloads.GET.Request,
    UserPayloads.GET.Response
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { user: UserRepository },
    ) {}

    async execute(request: UsersPayloadSchemas.GET.Request) {
        console.log(request)
        const jwt_payload = await this.clients.honoJwt.verify(
            request.getCookies.loginSessionId
        ) as LoginSessionEntity['toPrimitives']
        const session = LoginSessionEntity.fromPrimitives(jwt_payload)

        const user = await this.repositories.user.selectById(session.getValues.userId)
        if (!user) throw new UseCaseError(
            404,
            ERROR_MESSAGES.usecase.userNotFound.detail,
            ERROR_MESSAGES.usecase.userNotFound.issues,
            this.constructor.name
        )

        const { email, name } = user.toPrimitives
        return new UsersPayloadSchemas.GET.Response({
            body: {
                email,
                name,
                createdAt: user.getCreatedAt!.value
            }
        })
    }
}