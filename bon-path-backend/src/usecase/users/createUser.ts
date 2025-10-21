import BaseUseCase from "@usecase/_interface";
import { UserPayloads } from "@share/payloads";
import { UsersPayloadSchemas } from "@payload";
import { HonoJwtClient } from "@client";
import { UserRepository } from "@repository";
import { UserEntity, VerifySessionEntity } from "@models/entity";

export class CreateUserUseCase implements BaseUseCase<
    UserPayloads.POST.Request,
    UserPayloads.POST.Response
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { user: UserRepository },
    ) {}

    async execute(request: UsersPayloadSchemas.POST.Request) {
        const jwt_payload = await this.clients.honoJwt.verify(
            request.getCookies.verifySessionId
        ) as VerifySessionEntity['toPrimitives']
        const session = VerifySessionEntity.fromPrimitives(jwt_payload)
        const { 
            userName: name, 
            userEmail: email, 
            userHashPassword: password
        } = session.getValues
        
        const user = new UserEntity({ name, email, password })
        const inserted_user = await this.repositories.user.insert(user)

        return new UsersPayloadSchemas.POST.Response({
            body: {
                hashedId: inserted_user.hashedId!.value
            }
        })
    }
}