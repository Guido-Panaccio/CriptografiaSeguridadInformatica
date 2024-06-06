/*
  Warnings:

  - Changed the type of `fechaTurno` on the `Turnos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Turnos" DROP COLUMN "fechaTurno",
ADD COLUMN     "fechaTurno" TIMESTAMP(3) NOT NULL;
