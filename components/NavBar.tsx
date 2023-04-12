import Link from 'next/link'

import { styles } from '@/components/styles'
import { navLinks } from '@/lib/constants'
import { useState } from 'react'
import Image from 'next/image'
import { menu, close } from '@/assets'

const NavBar = () => {
    const [active, setActive] = useState('')
    const [toggle, setToggle] = useState(false)

    return (
        <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20`}>
            <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                <ul className="list-none hidden sm:flex flex-row gap-10">
                    {navLinks.map((nav) => (
                        <li
                            key={nav.title}
                            className={`${active === nav.title ? 'text-white' : 'text-secondary'} hover:text-white text-[18px] font-medium cursor-pointer`}
                            onClick={() => setActive(nav.title)}
                        >
                            {nav.id ? <a href={`#${nav.id}`}>{nav.title}</a> : <Link href={nav.link!}>{nav.title}</Link>}
                        </li>
                    ))}
                </ul>

                <div className="sm:hidden flex flex-1 justify-end items-center">
                    <Image src={toggle ? close : menu} alt="menu" className="w-[28px] h-[28px] object-contain" onClick={() => setToggle(!toggle)} />

                    <div className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
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
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
