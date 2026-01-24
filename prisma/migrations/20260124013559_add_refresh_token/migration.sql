/*
  Warnings:

  - You are about to drop the `Archive` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Request` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Archive" DROP CONSTRAINT "Archive_request_id_fkey";

-- DropTable
DROP TABLE "Archive";

-- DropTable
DROP TABLE "Request";

-- CreateTable
CREATE TABLE "requests" (
    "id" TEXT NOT NULL,
    "protocol" TEXT NOT NULL,
    "hash_protocol" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "course" TEXT NOT NULL,
    "students_number" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "archives" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,

    CONSTRAINT "archives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "requests_protocol_key" ON "requests"("protocol");

-- AddForeignKey
ALTER TABLE "archives" ADD CONSTRAINT "archives_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
