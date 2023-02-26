/*
  Warnings:

  - You are about to drop the `PRE_USER` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PRE_USER";

-- CreateTable
CREATE TABLE "PREUSER" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PREUSER_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PREUSER_email_key" ON "PREUSER"("email");
