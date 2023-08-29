import '@/styles/globals.css'

import { Slide, ToastContainer } from 'react-toastify'

import { NavBar } from '@/components'
import { getCurrentUser } from '@/lib/actions/user.actions'

export const metadata = {
    title: 'Checklisty',
    description: 'Checklisty is a checklist app for your daily tasks.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const user = await getCurrentUser()

    return (
        <html lang="en">
            <body>
                <ToastContainer
                    position="top-center"
                    autoClose={1400}
                    transition={Slide}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                    theme="light"
                />
                <header>
                    <NavBar user={user?.name} />
                </header>
                <main className="relative z-0 bg-primary">{children}</main>
            </body>
        </html>
    )
}
