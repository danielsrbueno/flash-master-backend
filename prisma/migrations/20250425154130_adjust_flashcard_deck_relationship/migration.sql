/*
  Warnings:

  - You are about to drop the `_FlashcardDecks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deckId` to the `Flashcard` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_FlashcardDecks_B_index";

-- DropIndex
DROP INDEX "_FlashcardDecks_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_FlashcardDecks";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Flashcard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "userId" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    CONSTRAINT "Flashcard_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Flashcard" ("answer", "createdAt", "id", "question", "updatedAt", "userId") SELECT "answer", "createdAt", "id", "question", "updatedAt", "userId" FROM "Flashcard";
DROP TABLE "Flashcard";
ALTER TABLE "new_Flashcard" RENAME TO "Flashcard";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
