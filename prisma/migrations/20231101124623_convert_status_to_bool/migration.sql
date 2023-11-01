/*
  Warnings:

  - You are about to alter the column `status` on the `Site` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(4))` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Site` MODIFY `status` BOOLEAN NOT NULL DEFAULT false;
