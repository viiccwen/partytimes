/*
  Warnings:

  - A unique constraint covering the columns `[partyid]` on the table `Party` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `partyid` to the `Party` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Party" ADD COLUMN     "partyid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Party_partyid_key" ON "Party"("partyid");
