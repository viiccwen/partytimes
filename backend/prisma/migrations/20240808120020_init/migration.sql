-- DropForeignKey
ALTER TABLE "Decision" DROP CONSTRAINT "Decision_partyid_fkey";

-- DropForeignKey
ALTER TABLE "TimeSlot" DROP CONSTRAINT "TimeSlot_votetimeId_fkey";

-- DropForeignKey
ALTER TABLE "Votetime" DROP CONSTRAINT "Votetime_partyid_fkey";

-- AddForeignKey
ALTER TABLE "Votetime" ADD CONSTRAINT "Votetime_partyid_fkey" FOREIGN KEY ("partyid") REFERENCES "Party"("partyid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_votetimeId_fkey" FOREIGN KEY ("votetimeId") REFERENCES "Votetime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Decision" ADD CONSTRAINT "Decision_partyid_fkey" FOREIGN KEY ("partyid") REFERENCES "Party"("partyid") ON DELETE CASCADE ON UPDATE CASCADE;
