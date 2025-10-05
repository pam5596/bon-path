import { PrismaVectorStore } from "@langchain/community/vectorstores/prisma";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PrismaClient, Prisma } from "./prisma";

export class PrismaVectorClient {
    public model: OpenAIEmbeddings
    public prisma: PrismaClient

    constructor(
        model: OpenAIEmbeddings,
        prisma: PrismaClient
    ) {
        this.model = model
        this.prisma = prisma
    }
    
    get product() {
        return PrismaVectorStore.withModel(this.prisma).create(
            this.model, {
                prisma: Prisma,
                tableName: 'ProductVector',
                vectorColumnName: 'emmbedding',
                columns: {
                    id: PrismaVectorStore.IdColumn,
                    content: PrismaVectorStore.ContentColumn,
                }
            }
        )
    }

    get store() {
        return PrismaVectorStore.withModel(this.prisma).create(
            this.model, {
                prisma: Prisma,
                tableName: 'StoreVector',
                vectorColumnName: 'emmbedding',
                columns: {
                    id: PrismaVectorStore.IdColumn,
                    content: PrismaVectorStore.ContentColumn,
                }
            }
        )
    }
}