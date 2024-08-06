/*
  Warnings:

  - The `end_ampm` column on the `Party` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `start_ampm` column on the `Party` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `vote_json` on the `Votetime` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Time" AS ENUM ('AM', 'PM');

-- DropForeignKey
ALTER TABLE "Votetime" DROP CONSTRAINT "Votetime_partyid_fkey";

-- AlterTable
ALTER TABLE "Party" DROP COLUMN "end_ampm",
ADD COLUMN     "end_ampm" "Time" NOT NULL DEFAULT 'PM',
DROP COLUMN "start_ampm",
ADD COLUMN     "start_ampm" "Time" NOT NULL DEFAULT 'AM';

-- AlterTable
ALTER TABLE "Votetime" DROP COLUMN "vote_json",
ALTER COLUMN "partyid" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "TimeSlot" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "start_time" INTEGER NOT NULL,
    "start_ampm" "Time" NOT NULL DEFAULT 'AM',
    "end_time" INTEGER NOT NULL,
    "end_ampm" "Time" NOT NULL DEFAULT 'PM',
    "votetimeId" INTEGER NOT NULL,

    CONSTRAINT "TimeSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Decision" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "start_time" INTEGER NOT NULL,
    "start_ampm" "Time" NOT NULL DEFAULT 'AM',
    "end_time" INTEGER NOT NULL,
    "end_ampm" "Time" NOT NULL DEFAULT 'PM',
    "partyid" TEXT NOT NULL,

    CONSTRAINT "Decision_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Decision_partyid_key" ON "Decision"("partyid");

-- AddForeignKey
ALTER TABLE "Votetime" ADD CONSTRAINT "Votetime_partyid_fkey" FOREIGN KEY ("partyid") REFERENCES "Party"("partyid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_votetimeId_fkey" FOREIGN KEY ("votetimeId") REFERENCES "Votetime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Decision" ADD CONSTRAINT "Decision_partyid_fkey" FOREIGN KEY ("partyid") REFERENCES "Party"("partyid") ON DELETE RESTRICT ON UPDATE CASCADE;
