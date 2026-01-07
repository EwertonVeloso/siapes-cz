-- CreateEnum
CREATE TYPE "EmployeeRole" AS ENUM ('ADMIN', 'MANAGER', 'PRECEPTOR');

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "professional_registration" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "role" "EmployeeRole" NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_professional_registration_key" ON "employees"("professional_registration");

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");
