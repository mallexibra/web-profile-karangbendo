import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import db from '@/utils/database';
import bcrypt from 'bcrypt';

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await db.user.findUnique({
                    where: { email: credentials.email },
                    include: { Shop: true }
                });

                if (user && await bcrypt.compare(credentials.password, user.password)) {
                    return {
                        id: String(user.id),
                        name: user.name,
                        email: user.email,
                        role: user.role ?? undefined,
                        phone: user.phone ?? undefined,
                        position: user.position ?? undefined,
                        shop: user.Shop?.map((shop: any) => ({
                            id: shop.id,
                            name: shop.name,
                            description: shop.description,
                            identity: shop.identity,
                            userId: shop.userId,
                            location: shop.location,
                            status: shop.status,
                            phone: shop.phone,
                            owner: shop.owner ?? null,
                            product: shop.product ?? []
                        })) ?? null
                    };
                } else {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: '/auth/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
                token.phone = user.phone;
                token.position = user.position;
                token.shop = user.shop ?? [];
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id as string,
                name: token.name as string,
                email: token.email as string,
                role: token.role as string,
                phone: token.phone as string,
                position: token.position as string,
                shop: token.shop?.map((shop: any) => ({
                    id: shop.id,
                    name: shop.name,
                    description: shop.description,
                    identity: shop.identity,
                    userId: shop.userId,
                    location: shop.location,
                    status: shop.status,
                    phone: shop.phone,
                    owner: shop.owner ?? null,
                    product: shop.product ?? []
                })) ?? null
            };
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
