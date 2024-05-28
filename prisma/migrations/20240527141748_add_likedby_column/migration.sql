/*
  Warnings:

  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_postsId_fkey";

-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "likedBy" JSONB NOT NULL DEFAULT '[]';

-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "likedBy" JSONB NOT NULL DEFAULT '[]';

-- DropTable
DROP TABLE "Tags";
