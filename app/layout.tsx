import '@/styles/globals.css'

import { cookies } from 'next/headers'

import { NavBar } from '@/components'
import { delay } from '@/lib/async'
import { getUserFromCookie } from '@/lib/auth'

export const metadata = {
    title: 'Checklisty',
    description: 'Checklisty is a checklist app for your daily tasks.',
}

const getUser = async () => {
    await delay(1000)
    const user = await getUserFromCookie(cookies())
    return user
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const user = await getUser()
    
    return (
        <html lang="en">
            <body>
                <header>
                    <NavBar user={user?.name} />
                </header>
                <main className="relative z-0 bg-primary">{children}</main>
            </body>
        </html>
    )
}