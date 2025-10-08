import BaseUseCase from "@usecase/_interface";
import { UserPayloads } from "@share/payloads";
import { UsersPayloadSchemas } from "@payload";
import { HonoJwtClient } from "@client";
import { UserRepository } from "@repository";
import { LoginSessionEntity } from "@models/entity";
import { JWTPayload } from "hono/utils/jwt/types";
import { UseCaseError } from "@error";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export class GetUserUseCase implements BaseUseCase<
    UserPayloads.GET.Request,
    UserPayloads.GET.Response
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { user: UserRepository },
        public request: UsersPayloadSchemas.GET.Request
    ) {}

    async execute() {
        const jwt_payload = await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        ) as LoginSessionEntity['toPrimitives'] & JWTPayload
        const session = LoginSessionEntity.fromPrimitives(jwt_payload)

        const user = await this.repositories.user.selectById(session.getValues.userId)
        if (!user) throw new UseCaseError(
            404,
            ERROR_MESSAGES.usecase.userNotFound.detial,
            ERROR_MESSAGES.usecase.userNotFound.issues,
            this.constructor.name
        )

        return new UsersPayloadSchemas.GET.Response({
            body: {
                ...user.toPrimitives,
                createdAt: user.getCreatedAt!.value
            }
        })
    }
}