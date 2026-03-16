/*
  Warnings:

  - Added the required column `category` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "isbn" TEXT,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "publisher" TEXT,
    "language" TEXT,
    "year" INTEGER,
    "coverImageUrl" TEXT,
    "copiesTotal" INTEGER NOT NULL DEFAULT 1,
    "copiesAvailable" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Book" ("authors", "copiesAvailable", "copiesTotal", "coverImageUrl", "createdAt", "description", "id", "isbn", "language", "publisher", "subtitle", "title", "updatedAt", "year") SELECT "authors", "copiesAvailable", "copiesTotal", "coverImageUrl", "createdAt", "description", "id", "isbn", "language", "publisher", "subtitle", "title", "updatedAt", "year" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_isbn_key" ON "Book"("isbn");
CREATE INDEX "Book_title_idx" ON "Book"("title");
CREATE INDEX "Book_authors_idx" ON "Book"("authors");
CREATE INDEX "Book_category_idx" ON "Book"("category");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
