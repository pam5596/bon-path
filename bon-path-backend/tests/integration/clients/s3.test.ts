import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { AwsS3Client } from "@client";
import { CreateBucketCommand, DeleteBucketCommand } from "@aws-sdk/client-s3";
import { readFile } from "node:fs/promises";

describe('AwsS3Clientの結合テスト', () => {
    const client = new AwsS3Client({
        bucketName: process.env.AWS_S3_BUCKET_NAME || '',
        region: process.env.AWS_S3_REGION,
        endpoint: process.env.AWS_S3_ENDPOINT,
        forcePathStyle: true,
        credentials: {
            accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID || '',
            secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY || ''
        }
    })

    beforeAll(() => {
        client.send(new CreateBucketCommand({ Bucket: process.env.AWS_S3_BUCKET_NAME }))
    });

    afterAll(async () => {
        await client.send(new DeleteBucketCommand({ Bucket: process.env.AWS_S3_BUCKET_NAME }))
    })

    it('putObjectメソッドがファイルをを保存し、レスポンスを返すこと', async () => {
        const file = await readFile('tests/fixtures/images/sample.png')
        const response = await client.putObject(
            file,
            'sample/1.png'
        );

        expect(response.$metadata.httpStatusCode).toBe(200)
    })

    it('deleteObjectメソッドがファイルをを削除すること', async () => {
        const response = await client.deleteObject('sample/1.png')
        console.log(response)
    })
})