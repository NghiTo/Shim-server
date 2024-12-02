-- DropForeignKey
ALTER TABLE `quiz` DROP FOREIGN KEY `Quiz_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
