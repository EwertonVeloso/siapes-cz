/*
  Warnings:

  - Added the required column `institutionId` to the `coordinators` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coordinators" ADD COLUMN     "institutionId" TEXT NOT NULL;
