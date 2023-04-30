import { db } from '../lib/db'

async function main() {
    const defaultUsers = ['Bob', 'Jackie', 'Alice']

    defaultUsers.map(async (name) => {
        await db.user.upsert({
            where: { email: `${name}@example.com` },
            update: {},
            create: {
                email: `${name}@example.com`,
                firstName: name,
                password: 'password',
            },
        })
        console.log(`User ${name} created successfully \n email:${name}@example.com \n password: password`)
    })
}

main()
    .then(async () => {
        await db.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await db.$disconnect()
        process.exit(1)
    })
