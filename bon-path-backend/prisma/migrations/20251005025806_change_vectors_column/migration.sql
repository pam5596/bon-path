/*
  Warnings:

  - You are about to drop the column `name` on the `ProductVector` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `StoreVector` table. All the data in the column will be lost.
  - Added the required column `content` to the `ProductVector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `StoreVector` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductVector" DROP COLUMN "name",
ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StoreVector" DROP COLUMN "name",
ADD COLUMN     "content" TEXT NOT NULL;
