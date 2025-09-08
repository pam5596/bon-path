import BaseRepository from "./_abstruct";
import queryHandler from "./_queryHandler";
import { Id, CreatedAt, UserHashId, UserName, UserEmail, UserHashPassword } from "@models/valueObject";
import { UserEntity } from "@models/entity";

export default class UserRepository extends BaseRepository {
    @queryHandler
    async insert(user: UserEntity) {
        const create_result = await this.client.user.create({
            data: user.getRowValues
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
            const { id, ...values } = find_result;
            return new UserEntity({
                hashedId: new UserHashId(values.hashedId),
                name: new UserName(values.name),
                email: new UserEmail(values.email),
                password: new UserHashPassword(values.password)
            }, new Id(id), new CreatedAt(values.createdAt));
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
            data: user.getRowValues
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