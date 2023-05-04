// 'use client'

import { cookies } from 'next/headers'
// import Image from 'next/image'
import Link from 'next/link'

// import { close, menu } from '@/assets'
import { styles } from '@/components/styles'
import { delay } from '@/lib/async'
import { getUserFromCookie } from '@/lib/auth'

import NavLinks from './NavLinks'
// import { navLinks } from '@/lib/constants'
// import { useState } from 'react'

const getData = async () => {
    await delay(2000)
    const user = await getUserFromCookie(cookies())
    return user
}

const NavBar = async () => {
    // const [active, setActive] = useState('')
    // const [toggle, setToggle] = useState(false)
    const user = await getData()
    
    return (
        <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20`}>
            <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                {/* <ul className="list-none hidden sm:flex flex-row gap-10">
                    {navLinks.map((nav) => (
                        <li
                            key={nav.title}
                            className={`${active === nav.title ? 'text-white' : 'text-secondary'} hover:text-white text-[18px] font-medium cursor-pointer`}
                            onClick={() => setActive(nav.title)}
                        >
                            {nav.id ? <a href={`#${nav.id}`}>{nav.title}</a> : <Link href={nav.link!}>{nav.title}</Link>}
                        </li>
                    ))}
                </ul> */}

                {/* <div className="sm:hidden flex flex-1 justify-end items-center"> */}
                {/* <Image src={toggle ? close : menu} alt="menu" className="w-[28px] h-[28px] object-contain" onClick={() => setToggle(!toggle)} /> */}

                {/* <div className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
                        <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
                            {navLinks.map((nav) => (
                                <li
                                    key={nav.title}
                                    className={`font-poppins font-medium cursor-pointer text-[16px] ${active === nav.title ? 'text-white' : 'text-secondary'}`}
                                    onClick={() => {
                                        setToggle(!toggle)
                                        setActive(nav.title)
                                    }}
                                >
                                    {nav.id ? <a href={`#${nav.id}`}>{nav.title}</a> : <Link href={nav.link!}>{nav.title}</Link>}
                                </li>
                            ))}
                        </ul>
                    </div> */}
                {/* </div> */}
                <NavLinks />
                <div className="flex">
                    {user ? 
                        <h2 className="text-sm flex items-center pr-1">Welcome {user.name}</h2>
                        : null
                    }
                    <Link href={ user ? '/logout' : '/sign-in'} className="text-sm bg-violet-600 py-1 px-2 rounded-md hover:bg-violet-700">
                        {user ? 'Logout' : 'Sign In/Sign Up'}
                    </Link>
                </div>
            </div>
        </nav>
    )
}
export default NavBar