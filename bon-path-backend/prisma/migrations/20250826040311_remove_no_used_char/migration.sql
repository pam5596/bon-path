-- AlterTable
ALTER TABLE "public"."Category" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."Product" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "image" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."ReceiptImage" ALTER COLUMN "url" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."Store" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "image" SET DATA TYPE TEXT,
ALTER COLUMN "googleMapLink" SET DATA TYPE TEXT;
