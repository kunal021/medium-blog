/*
  Warnings:

  - Made the column `postsId` on table `Comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `authorId` on table `Posts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_postsId_fkey";

-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_authorId_fkey";

-- AlterTable
ALTER TABLE "Comments" ALTER COLUMN "postsId" SET NOT NULL,
ALTER COLUMN "likedBy" SET DEFAULT ARRAY[]::INTEGER[];

-- AlterTable
ALTER TABLE "Posts" ALTER COLUMN "authorId" SET NOT NULL,
ALTER COLUMN "likedBy" SET DEFAULT ARRAY[]::INTEGER[];

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
