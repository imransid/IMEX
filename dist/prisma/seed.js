"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const user1 = await prisma.users.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            name: 'admin',
            email: 'admin@example.com',
            password: '12345678',
        },
    });
    const user2 = await prisma.users.upsert({
        where: { email: 'user2@example.com' },
        update: {},
        create: {
            name: 'admin2',
            email: 'admin2@example.com',
            password: '12345678',
        },
    });
    console.log({ user1, user2 });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map