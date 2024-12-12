/*
  Warnings:

  - Changed the type of `complaint` on the `PublicComplaints` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PublicComplaints" DROP COLUMN "complaint",
ADD COLUMN     "complaint" TEXT NOT NULL;

-- DropEnum
DROP TYPE "TypeOfComplaint";
