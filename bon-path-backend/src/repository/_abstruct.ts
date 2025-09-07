import { PrismaClient } from "@prismaGeneratedClient";

export default abstract class BaseRepository {
    readonly client: PrismaClient;
    
    constructor(client: PrismaClient) {
        this.client = client
    }
}