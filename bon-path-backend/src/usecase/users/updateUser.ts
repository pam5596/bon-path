import BaseUseCase from "@usecase/_interface";
import { UserPayloads } from "@share/payloads";
import { UsersPayloadSchemas } from "@payload";
import { HonoJwtClient } from "@client";
import { UserRepository } from "@repository";
import { UserPasswordHashService } from "@service";
import { LoginSessionEntity } from "@models/entity";
import { UseCaseError } from "@lib/error";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";

export class UpdateUserUseCase implements BaseUseCase<
    UserPayloads.PATCH.Request
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { user: UserRepository },
        public services: { userPasswordHash: UserPasswordHashService },
    ) {}

    async execute(request: UsersPayloadSchemas.PATCH.Request) {
        const jwt_payload = await this.clients.honoJwt.verify(
            request.getCookies.loginSessionId
        ) as LoginSessionEntity['toPrimitives']
        const session = LoginSessionEntity.fromPrimitives(jwt_payload)

        const user = await this.repositories.user.selectById(session.getValues.userId)
        if (!user) throw new UseCaseError(
            404,
            ERROR_MESSAGES.usecase.userNotFound.detail,
            ERROR_MESSAGES.usecase.userNotFound.issues,
            this.constructor.name,
            request.getBody
        )
        user.newValues = request.toValueObjectBody()

        await this.repositories.user.update(user)
    }
}