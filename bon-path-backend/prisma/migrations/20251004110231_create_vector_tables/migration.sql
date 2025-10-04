-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateTable
CREATE TABLE "public"."ProductVector" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "emmbedding" vector NOT NULL,

    CONSTRAINT "ProductVector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."StoreVector" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "emmbedding" vector NOT NULL,

    CONSTRAINT "StoreVector_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductVector_productId_key" ON "public"."ProductVector"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "StoreVector_storeId_key" ON "public"."StoreVector"("storeId");

-- AddForeignKey
ALTER TABLE "public"."ProductVector" ADD CONSTRAINT "ProductVector_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StoreVector" ADD CONSTRAINT "StoreVector_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
