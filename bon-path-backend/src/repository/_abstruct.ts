import { PrismaClient } from "@client";

export default abstract class BaseRepository {
    public client: PrismaClient;

    constructor(client: PrismaClient) {
        this.client = client
    }
}