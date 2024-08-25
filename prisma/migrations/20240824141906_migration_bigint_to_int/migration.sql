/*
  Warnings:

  - You are about to alter the column `resident` on the `VillageProfile` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `children` on the `VillageProfile` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `mature` on the `VillageProfile` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `old` on the `VillageProfile` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "PublicComplaints" ALTER COLUMN "supportingEvidence" DROP NOT NULL;

-- AlterTable
ALTER TABLE "VillageProfile" ALTER COLUMN "resident" SET DATA TYPE INTEGER,
ALTER COLUMN "children" SET DATA TYPE INTEGER,
ALTER COLUMN "mature" SET DATA TYPE INTEGER,
ALTER COLUMN "old" SET DATA TYPE INTEGER;
