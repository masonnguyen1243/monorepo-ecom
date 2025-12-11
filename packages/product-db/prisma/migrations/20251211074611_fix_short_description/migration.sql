/*
  Warnings:

  - You are about to drop the column `shortDescriptio` on the `Product` table. All the data in the column will be lost.
  - Added the required column `shortDescription` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "shortDescriptio",
ADD COLUMN     "shortDescription" TEXT NOT NULL;
