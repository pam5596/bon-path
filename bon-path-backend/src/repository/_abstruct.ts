import { PrismaClient } from "@prismaGeneratedClient";

export default abstract class BaseRepository {
    constructor(private client: PrismaClient) {}
}