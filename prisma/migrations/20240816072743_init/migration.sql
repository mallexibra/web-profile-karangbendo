/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('village_head', 'employee', 'admin', 'umkm');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('village_head', 'employee');

-- CreateEnum
CREATE TYPE "TypeOfComplaint" AS ENUM ('fasilitas_umum');

-- CreateEnum
CREATE TYPE "TypeOfFinance" AS ENUM ('income', 'expenditure');

-- CreateEnum
CREATE TYPE "TypeOfLegal" AS ENUM ('village_regulation', 'village_head_regulation', 'village_head_decision');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "position" "Position",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'admin',
ADD COLUMN     "verified" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "VillageProfile" (
    "id" SERIAL NOT NULL,
    "visi" TEXT NOT NULL,
    "misi" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "resident" BIGINT NOT NULL,
    "children" BIGINT NOT NULL,
    "mature" BIGINT NOT NULL,
    "old" BIGINT NOT NULL,

    CONSTRAINT "VillageProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VillageApparatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "profile" TEXT NOT NULL,

    CONSTRAINT "VillageApparatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VillageInfrastruktur" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "VillageInfrastruktur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityActivities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "CommunityActivities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicComplaints" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "complaint" "TypeOfComplaint" NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "supportingEvidence" TEXT NOT NULL,

    CONSTRAINT "PublicComplaints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VillageGovernmentFinance" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TypeOfFinance" NOT NULL,
    "amount" BIGINT NOT NULL,

    CONSTRAINT "VillageGovernmentFinance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentationActivities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "DocumentationActivities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkPlanAndBudget" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "budget" BIGINT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkPlanAndBudget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegalProduct" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "TypeOfLegal" NOT NULL,

    CONSTRAINT "LegalProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "identity" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "shopId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
