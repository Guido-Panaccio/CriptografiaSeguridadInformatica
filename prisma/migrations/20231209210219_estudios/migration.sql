/*
  Warnings:

  - Added the required column `estudioPath` to the `Estudios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaRealizacion` to the `Estudios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Estudios" ADD COLUMN     "estudioPath" VARCHAR(200) NOT NULL,
ADD COLUMN     "fechaRealizacion" TIMESTAMP(3) NOT NULL;
