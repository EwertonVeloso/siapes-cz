-- CreateEnum
CREATE TYPE "CoordinatorRole" AS ENUM ('COORDINATOR');

-- CreateTable
CREATE TABLE "coordinators" (
    "id" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "role" "CoordinatorRole" NOT NULL DEFAULT 'COORDINATOR',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coordinators_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coordinators_registration_key" ON "coordinators"("registration");

-- CreateIndex
CREATE UNIQUE INDEX "coordinators_email_key" ON "coordinators"("email");
