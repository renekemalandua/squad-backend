/*
  Warnings:

  - Made the column `cover` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `photo` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "cover" SET NOT NULL,
ALTER COLUMN "cover" SET DEFAULT 'https://res.cloudinary.com/dayiorfxq/image/upload/v1714483169/professional/images/pwj9eco6xvl48oke3fbu.webp',
ALTER COLUMN "photo" SET NOT NULL,
ALTER COLUMN "photo" SET DEFAULT 'https://res.cloudinary.com/dayiorfxq/image/upload/v1714483169/professional/images/pwj9eco6xvl48oke3fbu.webp';
