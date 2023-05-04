'use client'
import { useRouter } from 'next/navigation'

import { logout } from '../lib/api'

const Signout = async () => {
    const router = useRouter()
    await logout()
    router.push('/')
    router.refresh()
    return (
        <>
            <h1>Signout</h1>
        </>
    )
}
export default Signout