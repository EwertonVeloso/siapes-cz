-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('ACCEPTED', 'PENDING', 'REFUSED');

-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL,
    "protocol" TEXT NOT NULL,
    "hash_protocol" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "course" TEXT NOT NULL,
    "students_number" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Archive" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,

    CONSTRAINT "Archive_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Request_protocol_key" ON "Request"("protocol");

-- AddForeignKey
ALTER TABLE "Archive" ADD CONSTRAINT "Archive_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
