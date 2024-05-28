/*
  Warnings:

  - The `likedBy` column on the `Comments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `likedBy` column on the `Posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "likedBy",
ADD COLUMN     "likedBy" INTEGER[];

-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "likedBy",
ADD COLUMN     "likedBy" INTEGER[];
