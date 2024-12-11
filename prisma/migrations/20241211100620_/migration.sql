-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'umkm');

-- CreateEnum
CREATE TYPE "TypeOfComplaint" AS ENUM ('fasilitas_umum');

-- CreateEnum
CREATE TYPE "TypeOfFinance" AS ENUM ('income', 'expenditure');

-- CreateEnum
CREATE TYPE "TypeOfLegal" AS ENUM ('village_regulation', 'village_head_regulation', 'village_head_decision');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'admin',
    "password" TEXT NOT NULL,
    "verified" TIMESTAMP(3),
    "position" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VillageProfile" (
    "id" SERIAL NOT NULL,
    "visi" TEXT NOT NULL,
    "misi" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "resident" INTEGER NOT NULL,
    "children" INTEGER NOT NULL,
    "mature" INTEGER NOT NULL,
    "old" INTEGER NOT NULL,

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
CREATE TABLE "VillagePotential" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "VillagePotential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VillageInstitution" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VillageInstitution_pkey" PRIMARY KEY ("id")
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
    "emailOrPhone" TEXT,
    "supportingEvidence" TEXT,

    CONSTRAINT "PublicComplaints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VillageGovernmentFinance" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TypeOfFinance" NOT NULL,
    "amount" INTEGER NOT NULL,

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
    "budget" INTEGER NOT NULL,
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
    "file" TEXT,

    CONSTRAINT "LegalProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "identity" TEXT NOT NULL,
    "userId" INTEGER,
    "location" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "shopId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
