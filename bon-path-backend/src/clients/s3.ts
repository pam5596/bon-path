import { DeleteObjectCommand, PutObjectCommand, S3Client, S3ClientConfig, S3ServiceException } from "@aws-sdk/client-s3";
import { ERROR_MESSAGES } from "@constants/errorMessages";
import { ClientError } from "@error";

export class AwsS3Client extends S3Client {
    private readonly bucketName: string;

    constructor(config: S3ClientConfig & { bucketName: string }) {
        const { bucketName, ...s3Config } = config
        super(s3Config)
        this.bucketName = bucketName
    }

    async putObject(file: Buffer, key: string) {
        try {
            return await this.send(
                new PutObjectCommand({
                    Bucket: this.bucketName,
                    Key: key,
                    Body: file
                })
            )
        } catch(e: unknown) {
            if (e instanceof S3ServiceException) {
                throw new ClientError(
                    e.$response?.statusCode || 500,
                    ERROR_MESSAGES.client.s3,
                    e.message,
                    this.constructor.name,
                    key
                )
            } else {
                throw e
            }
        }
    }

    async deleteObject(key: string) {
        try {
            await this.send(
                new DeleteObjectCommand({
                    Bucket: this.bucketName,
                    Key: key,
                })
            )
        } catch(e: unknown) {
            if (e instanceof S3ServiceException) {
                throw new ClientError(
                    e.$response?.statusCode || 500,
                    ERROR_MESSAGES.client.s3,
                    e.message,
                    this.constructor.name,
                    key
                )
            } else {
                throw e
            }
        }
    }
}