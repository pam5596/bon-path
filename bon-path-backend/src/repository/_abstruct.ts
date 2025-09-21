import { PrismaClient } from "@prismaGeneratedClient";

export default abstract class BaseRepository {
    protected client: PrismaClient;

    constructor(client: PrismaClient) {
        this.client = client
    }
}