/*
  Warnings:

  - Added the required column `tipoEstudio` to the `Estudios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Estudios" ADD COLUMN     "tipoEstudio" VARCHAR(50) NOT NULL;
