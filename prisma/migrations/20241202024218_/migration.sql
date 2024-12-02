-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('student', 'teacher', 'admin') NULL,
    MODIFY `password` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `title` VARCHAR(191) NOT NULL DEFAULT '';
