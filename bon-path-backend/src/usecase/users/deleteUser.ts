import BaseUseCase from "@usecase/_interface";
import { UserPayloads } from "@share/payloads";
import { UsersPayloadSchemas } from "@payload";
import { HonoJwtClient } from "@client";
import { UserRepository } from "@repository";
import { LoginSessionEntity } from "@models/entity";

export class DeleteUserUseCase implements BaseUseCase<
    UserPayloads.DELETE.Request
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { user: UserRepository },
    ) {}

    async execute(request: UsersPayloadSchemas.DELETE.Request) {
        const jwt_payload = await this.clients.honoJwt.verify(
            request.getCookies.loginSessionId
        ) as LoginSessionEntity['toPrimitives']
        const session = LoginSessionEntity.fromPrimitives(jwt_payload)

        await this.repositories.user.deleteById(session.getValues.userId)
    }
}