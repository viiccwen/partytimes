/*
  Warnings:

  - Made the column `userId` on table `Votetime` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Votetime" DROP CONSTRAINT "Votetime_userId_fkey";

-- AlterTable
ALTER TABLE "Votetime" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Votetime" ADD CONSTRAINT "Votetime_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
