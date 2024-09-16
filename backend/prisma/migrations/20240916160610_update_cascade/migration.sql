-- DropForeignKey
ALTER TABLE "Party" DROP CONSTRAINT "Party_userId_fkey";

-- DropForeignKey
ALTER TABLE "Votetime" DROP CONSTRAINT "Votetime_userId_fkey";

-- AddForeignKey
ALTER TABLE "Party" ADD CONSTRAINT "Party_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votetime" ADD CONSTRAINT "Votetime_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
