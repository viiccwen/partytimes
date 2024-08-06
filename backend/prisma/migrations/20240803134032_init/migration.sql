/*
  Warnings:

  - You are about to drop the column `datetime` on the `Party` table. All the data in the column will be lost.
  - Added the required column `end_ampm` to the `Party` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `Party` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_ampm` to the `Party` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `Party` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Party` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Party" DROP COLUMN "datetime",
ADD COLUMN     "date" TEXT[],
ADD COLUMN     "end_ampm" TEXT NOT NULL,
ADD COLUMN     "end_time" INTEGER NOT NULL,
ADD COLUMN     "start_ampm" TEXT NOT NULL,
ADD COLUMN     "start_time" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Votetime" ADD COLUMN     "vote_json" JSONB[];
