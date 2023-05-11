// 'use client'
import { cookies } from 'next/headers'
import Link from 'next/link'

import { styles } from '@/components/styles'
import { delay } from '@/lib/async'
import { getUserFromCookie } from '@/lib/auth'

import NavLinks from './NavLinks'

const getData = async () => {
    await delay(2300)
    const user = await getUserFromCookie(cookies())
    return user
}

const NavBar = async () => {
    const user = await getData()
    
    return (
        <header>
            <nav className={`${styles.paddingX} w-full flex items-center justify-between py-5 fixed top-0 z-20`}>
                <NavLinks />
                <div className="flex">
                    {user ? <h2 className="text-sm flex items-center pr-1">Welcome {user.name}</h2> : null}
                    <Link href={user ? '/logout' : '/sign-in'} className="text-sm bg-teal-600 py-1 px-2 rounded-md hover:bg-teal-700">
                        {user ? 'Logout' : 'Sign In/Sign Up'}
                    </Link>
                </div>
            </nav>
        </header>
    )
}
export default NavBar