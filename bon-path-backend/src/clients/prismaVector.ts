import { PrismaVectorStore } from "@langchain/community/vectorstores/prisma";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PrismaClient } from "@prisma/client";

export class PrismaVectorClient {
    constructor(
        private model: OpenAIEmbeddings,
        private prisma: PrismaClient
    ) {}
    
    get product() {
        return PrismaVectorStore.withModel(this.prisma).create(
            this.model, {
                prisma: this.prisma,
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
                prisma: this.prisma,
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