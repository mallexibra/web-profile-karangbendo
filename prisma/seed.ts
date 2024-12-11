import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
    await prisma.user.createMany({
        data: [
            {
                name: 'Admin Desa',
                email: 'admin@gmail.com',
                phone: '08123456789',
                role: 'admin',
                password: await bcrypt.hash('admin1234', 10),
                position: 'admin',
            },
            {
                name: 'UMKM Desa',
                email: 'umkm@gmail.com',
                phone: '08123456789',
                role: 'umkm',
                password: await bcrypt.hash('admin1234', 10)
            }
        ],
    });

    console.log('Seeder berhasil dijalankan untuk User!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
