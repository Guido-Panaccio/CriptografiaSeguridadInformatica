/*
  Warnings:

  - You are about to drop the column `especialidad` on the `Medicos` table. All the data in the column will be lost.
  - You are about to drop the column `idPrepaga` on the `Medicos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Medicos" DROP CONSTRAINT "Medicos_idPrepaga_fkey";

-- AlterTable
ALTER TABLE "Medicos" DROP COLUMN "especialidad",
DROP COLUMN "idPrepaga",
ADD COLUMN     "contrasena" VARCHAR(255),
ADD COLUMN     "username" VARCHAR(255);
