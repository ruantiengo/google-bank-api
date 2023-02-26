/*
  Warnings:

  - You are about to drop the column `payer_id` on the `Transfer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_payer_id_fkey";

-- AlterTable
ALTER TABLE "Transfer" DROP COLUMN "payer_id",
ADD COLUMN     "sender_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
