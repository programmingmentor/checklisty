import { Inter } from 'next/font/google'

import { About } from '@/components'
import { Checkboxes } from '@/components/shared'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
        <About />
        <Checkboxes isAuthenticated={false} />
    </>

    )}
