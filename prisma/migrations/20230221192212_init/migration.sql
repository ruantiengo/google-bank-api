/*
  Warnings:

  - You are about to drop the `PREUSER` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PREUSER";

-- CreateTable
CREATE TABLE "PRE_USER" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PRE_USER_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PRE_USER_email_key" ON "PRE_USER"("email");
