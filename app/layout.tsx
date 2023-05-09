import '@/styles/globals.css'

import { NavBar } from '@/components'

export const metadata = {
    title: 'Checklisty',
    description: 'Checklisty is a checklist app for your daily tasks.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <main className="relative z-0 bg-primary">
                    <header>
                        <NavBar />
                    </header>

                    {children}
                </main>
            </body>
        </html>
    )
}