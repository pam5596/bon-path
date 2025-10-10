import BaseRepository from "./_abstruct";
import queryHandler from "./_queryHandler";
import { Id, CreatedAt, UserHashId, UserName, UserHashPassword, UserEmail } from "@models/valueObject";
import { UserEntity } from "@models/entity";

export default class UserRepository extends BaseRepository {
    @queryHandler
    async insert(user: UserEntity) {
        const create_result = await this.client.user.create({
            data: user.toPrimitives
        });
        user.newId = new Id(create_result.id);
        user.newHashedId = new UserHashId(create_result.hashedId);
        user.created = new CreatedAt(create_result.createdAt)

        return user;
    }

    @queryHandler
    async selectById(id: Id) {
        const find_result = await this.client.user.findUnique({
            where: {
                id: id.value,
            },
        });

        if (find_result) {
            return UserEntity.fromPrimitives(find_result)
        } else {
            return find_result;
        }
    }

    @queryHandler
    async selectByEmailAndPassword(email: UserEmail, password: UserHashPassword) {
        const find_result = await this.client.user.findFirst({
            where: {
                email: email.value,
                password: password.value
            }
        });
        
        if (find_result) {
            return UserEntity.fromPrimitives(find_result)
        } else {
            return find_result;
        }
    }

    @queryHandler
    async update(user: UserEntity) {
        await this.client.user.update({
            where: {
                id: user.id!.value
            },
            data: user.toPrimitives
        })
    }

    @queryHandler
    async deleteById(id: Id) {
        await this.client.user.delete({
            where: {
                id: id.value
            }
        })
    }
}