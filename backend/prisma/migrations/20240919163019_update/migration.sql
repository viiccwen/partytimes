/*
  Warnings:

  - The `start_ampm` column on the `Decision` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `end_ampm` column on the `Decision` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `end_ampm` column on the `Party` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `start_ampm` column on the `Party` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `start_ampm` column on the `TimeSlot` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `end_ampm` column on the `TimeSlot` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AMPM" AS ENUM ('AM', 'PM');

-- AlterTable
ALTER TABLE "Decision" DROP COLUMN "start_ampm",
ADD COLUMN     "start_ampm" "AMPM" NOT NULL DEFAULT 'AM',
DROP COLUMN "end_ampm",
ADD COLUMN     "end_ampm" "AMPM" NOT NULL DEFAULT 'PM';

-- AlterTable
ALTER TABLE "Party" DROP COLUMN "end_ampm",
ADD COLUMN     "end_ampm" "AMPM" NOT NULL DEFAULT 'PM',
DROP COLUMN "start_ampm",
ADD COLUMN     "start_ampm" "AMPM" NOT NULL DEFAULT 'AM';

-- AlterTable
ALTER TABLE "TimeSlot" DROP COLUMN "start_ampm",
ADD COLUMN     "start_ampm" "AMPM" NOT NULL DEFAULT 'AM',
DROP COLUMN "end_ampm",
ADD COLUMN     "end_ampm" "AMPM" NOT NULL DEFAULT 'PM';

-- DropEnum
DROP TYPE "Time";
