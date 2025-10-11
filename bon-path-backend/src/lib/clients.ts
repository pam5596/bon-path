import {
    AwsS3Client,
    PrismaClient,
    LangChainOpenAiClient,
    GoogleMapPlacesAPIClient,
    GoogleSearchAPIClient,
    Argon2Client,
    PrismaVectorClient,
    HonoJwtClient,
    PinoClient
} from "@client"
import { OpenAIEmbeddings } from "@langchain/openai";
import { argon2id } from "argon2";

export const awsS3 = new AwsS3Client({
    bucketName: process.env.AWS_S3_BUCKET_NAME!,
    region: process.env.AWS_S3_REGION,
    endpoint: process.env.AWS_S3_ENDPOINT,
    forcePathStyle: true,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!
    }
});

export const prisma = new PrismaClient()

export const langChainOpenAi4_1 = new LangChainOpenAiClient({
    model: 'gpt-4.1',
    apiKey: process.env.OPEN_AI_API_KEY!,
    temperature: 0
});

export const langChainOpenAi4o = new LangChainOpenAiClient({
    model: 'gpt-4o-mini',
    apiKey: process.env.OPEN_AI_API_KEY!,
    temperature: 0
});

export const googleMapPlaces = new GoogleMapPlacesAPIClient({
    apiVersion: 'v1',
    apiKey: process.env.GOOGLE_API_KEY!
});

export const googleSearch = new GoogleSearchAPIClient({
    apiVersion: 'v1',
    apiKey: process.env.GOOGLE_API_KEY!,
    engineCx: process.env.GOOGLE_SEARCH_CX!
});

export const argon2 = new Argon2Client({ type: argon2id });

export const openAiEmbedding = new OpenAIEmbeddings();

export const prismaVector = new PrismaVectorClient(openAiEmbedding, prisma);

export const honoJwtLogin = new HonoJwtClient(process.env.JWT_LOGIN_SECRET_KEY!);

export const honoJwtVerify = new HonoJwtClient(process.env.JWT_LOGIN_SECRET_KEY!);

export const logger = PinoClient;