const dotenv = require("dotenv");
dotenv.config();

const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");

function getSqliteFilePath() {
  const url = process.env.DATABASE_URL;
  if (!url) return "dev.db";
  if (!url.startsWith("file:")) return "dev.db";
  const path = url.slice("file:".length);
  return path.startsWith("./") ? path.slice(2) : path;
}

async function main() {
  const sqlitePath = getSqliteFilePath();
  const adapter = new PrismaBetterSqlite3({ url: sqlitePath });
  const prisma = new PrismaClient({ adapter });

  const admin = await prisma.user.upsert({
    where: { email: "admin@library.local" },
    update: { name: "Admin", role: "ADMIN", status: "ACTIVE" },
    create: {
      email: "admin@library.local",
      name: "Admin",
      role: "ADMIN",
      status: "ACTIVE",
      passwordHash: "seed-admin",
    },
  });

  const librarian = await prisma.user.upsert({
    where: { email: "librarian@library.local" },
    update: { name: "Librarian", role: "LIBRARIAN", status: "ACTIVE" },
    create: {
      email: "librarian@library.local",
      name: "Librarian",
      role: "LIBRARIAN",
      status: "ACTIVE",
      passwordHash: "seed-librarian",
    },
  });

  const student1 = await prisma.user.upsert({
    where: { email: "student1@library.local" },
    update: { name: "Student One", role: "MEMBER", status: "ACTIVE" },
    create: {
      email: "student1@library.local",
      name: "Student One",
      role: "MEMBER",
      status: "ACTIVE",
      passwordHash: "seed-student1",
    },
  });

  const student2 = await prisma.user.upsert({
    where: { email: "student2@library.local" },
    update: { name: "Student Two", role: "MEMBER", status: "ACTIVE" },
    create: {
      email: "student2@library.local",
      name: "Student Two",
      role: "MEMBER",
      status: "ACTIVE",
      passwordHash: "seed-student2",
    },
  });

  await prisma.config.upsert({
    where: { key: "FINE_RATE_PER_DAY" },
    update: { value: "0.50" },
    create: {
      key: "FINE_RATE_PER_DAY",
      value: "0.50",
      description: "Fine rate in USD per day for overdue loans.",
    },
  });

  const books = [
    // TECH (4)
    {
      isbn: "9780000000001",
      title: "Clean Code in Practice",
      authors: "Robert C. Martin",
      category: "TECH",
      publisher: "Pragmatic Library",
      year: 2010,
    },
    {
      isbn: "9780000000002",
      title: "Designing Reliable Systems",
      authors: "Nadia Eghbal",
      category: "TECH",
      publisher: "Tech Press",
      year: 2018,
    },
    {
      isbn: "9780000000003",
      title: "Data Structures & Algorithms",
      authors: "A. Author",
      category: "TECH",
      publisher: "CS Books",
      year: 2016,
    },
    {
      isbn: "9780000000004",
      title: "Practical API Design",
      authors: "J. Doe",
      category: "TECH",
      publisher: "API House",
      year: 2021,
    },

    // FICTION (4)
    {
      isbn: "9780000000011",
      title: "The Silent Library",
      authors: "L. Chen",
      category: "FICTION",
      publisher: "NovelWorks",
      year: 2019,
    },
    {
      isbn: "9780000000012",
      title: "A City of Paper",
      authors: "M. Rivera",
      category: "FICTION",
      publisher: "NovelWorks",
      year: 2017,
    },
    {
      isbn: "9780000000013",
      title: "The Long Winter Road",
      authors: "S. Patel",
      category: "FICTION",
      publisher: "Fiction House",
      year: 2015,
    },
    {
      isbn: "9780000000014",
      title: "Letters to Tomorrow",
      authors: "K. Tanaka",
      category: "FICTION",
      publisher: "Fiction House",
      year: 2022,
    },

    // SCIENCE (4)
    {
      isbn: "9780000000021",
      title: "A Brief Guide to the Cosmos",
      authors: "E. Nguyen",
      category: "SCIENCE",
      publisher: "Science Press",
      year: 2012,
    },
    {
      isbn: "9780000000022",
      title: "The Language of Cells",
      authors: "H. Kim",
      category: "SCIENCE",
      publisher: "Science Press",
      year: 2020,
    },
    {
      isbn: "9780000000023",
      title: "Physics for Curious Minds",
      authors: "D. Singh",
      category: "SCIENCE",
      publisher: "Lab Notes",
      year: 2014,
    },
    {
      isbn: "9780000000024",
      title: "Earth: Systems and Change",
      authors: "A. Johnson",
      category: "SCIENCE",
      publisher: "Lab Notes",
      year: 2018,
    },

    // HISTORY (4)
    {
      isbn: "9780000000031",
      title: "Empires and Trade Routes",
      authors: "P. Hassan",
      category: "HISTORY",
      publisher: "History House",
      year: 2009,
    },
    {
      isbn: "9780000000032",
      title: "The Modern World in 50 Moments",
      authors: "C. Smith",
      category: "HISTORY",
      publisher: "History House",
      year: 2016,
    },
    {
      isbn: "9780000000033",
      title: "Revolutions: A Short History",
      authors: "A. Garcia",
      category: "HISTORY",
      publisher: "Archive Press",
      year: 2013,
    },
    {
      isbn: "9780000000034",
      title: "Maps That Changed Everything",
      authors: "R. Walker",
      category: "HISTORY",
      publisher: "Archive Press",
      year: 2021,
    },

    // MANAGEMENT (4)
    {
      isbn: "9780000000041",
      title: "The Effective Manager",
      authors: "J. Lewis",
      category: "MANAGEMENT",
      publisher: "Biz Books",
      year: 2011,
    },
    {
      isbn: "9780000000042",
      title: "Leading with Clarity",
      authors: "S. Ahmed",
      category: "MANAGEMENT",
      publisher: "Biz Books",
      year: 2019,
    },
    {
      isbn: "9780000000043",
      title: "Operations Made Simple",
      authors: "T. Müller",
      category: "MANAGEMENT",
      publisher: "Org Press",
      year: 2015,
    },
    {
      isbn: "9780000000044",
      title: "Strategy in a Week",
      authors: "N. Brown",
      category: "MANAGEMENT",
      publisher: "Org Press",
      year: 2023,
    },
  ];

  const seeded = [];
  for (const b of books) {
    const book = await prisma.book.upsert({
      where: { isbn: b.isbn },
      update: {
        title: b.title,
        authors: b.authors,
        category: b.category,
        publisher: b.publisher ?? null,
        year: b.year ?? null,
      },
      create: {
        isbn: b.isbn,
        title: b.title,
        authors: b.authors,
        category: b.category,
        publisher: b.publisher ?? null,
        year: b.year ?? null,
        copiesTotal: 1,
        copiesAvailable: 1,
      },
    });
    seeded.push(book);
  }

  const borrowed = seeded.slice(0, 5);
  const available = seeded.slice(5);

  await prisma.book.updateMany({
    where: { id: { in: borrowed.map((b) => b.id) } },
    data: { copiesTotal: 1, copiesAvailable: 0 },
  });
  await prisma.book.updateMany({
    where: { id: { in: available.map((b) => b.id) } },
    data: { copiesTotal: 1, copiesAvailable: 1 },
  });

  await prisma.loan.deleteMany({
    where: {
      status: "ACTIVE",
      bookId: { in: borrowed.map((b) => b.id) },
      userId: { in: [student1.id, student2.id] },
    },
  });

  const now = new Date();
  const dueAt = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

  await prisma.loan.createMany({
    data: borrowed.map((b, idx) => ({
      userId: (idx % 2 === 0 ? student1 : student2).id,
      bookId: b.id,
      status: "ACTIVE",
      checkedOutAt: now,
      dueAt,
    })),
  });

  console.log(
    [
      "Seed completed:",
      `- Users: admin=${admin.email}, librarian=${librarian.email}, students=${student1.email}, ${student2.email}`,
      `- Books: ${seeded.length} total (${available.length} available, ${borrowed.length} borrowed)`,
      "- Config: FINE_RATE_PER_DAY=0.50",
    ].join("\n")
  );

  await prisma.$disconnect();
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });

