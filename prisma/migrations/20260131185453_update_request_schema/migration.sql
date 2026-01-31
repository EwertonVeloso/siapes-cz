/*
  Warnings:

  - You are about to drop the column `hash_protocol` on the `requests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "requests" DROP COLUMN "hash_protocol";
