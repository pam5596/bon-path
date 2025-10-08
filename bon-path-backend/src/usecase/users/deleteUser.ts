import BaseUseCase from "@usecase/_interface";
import { UserPayloads } from "@share/payloads";
import { UsersPayloadSchemas } from "@payload";
import { HonoJwtClient } from "@client";
import { UserRepository } from "@repository";
import { JWTPayload } from "hono/utils/jwt/types";
import { LoginSessionEntity } from "@models/entity";

export class DeleteUserUseCase implements BaseUseCase<
    UserPayloads.DELETE.Request
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { user: UserRepository },
        public request: UsersPayloadSchemas.PATCH.Request
    ) {}

    async execute() {
        const jwt_payload = await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        ) as LoginSessionEntity['toPrimitives'] & JWTPayload
        const session = LoginSessionEntity.fromPrimitives(jwt_payload)

        await this.repositories.user.deleteById(session.getValues.userId)
    }
}