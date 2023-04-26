import { db } from '@/lib/db'

//create 3 users
async function main() {
    const users = [
        { email: 'John@email.com', password: '123321', firstName: 'John' },
        { email: 'Wick@email.com', password: '123321', firstName: 'Wick' },
        { email: 'Julia@email.com', password: '123321', firstName: 'Julia' },
    ]

    users.map(async (user) => {
        await db.user.upsert({
            where: { email: user.email },
            create: {
                email: user.email,
                password: user.password,
                firstName: user.firstName,
            },
            update: {},
        })
    })
}

main()
    .then(async () => {
        await db.$disconnect()
    })
    .catch(async (e) => {
        await db.$disconnect()
        process.exit(1)
    })
