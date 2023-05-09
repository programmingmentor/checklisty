// 'use client'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useEffect, useState } from 'react'

// import { close, menu } from '@/assets'
// import { navLinks } from '@/lib/constants'

// const NavLinks = ({ user }) => {
//     const [active, setActive] = useState('')
//     const [toggle, setToggle] = useState(false)
        
//     return (
//         <>
//             <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
//                 <ul className="list-none hidden sm:flex flex-row gap-10">
//                     {navLinks.map((nav) => (
//                         <li
//                             key={nav.title}
//                             className={`${active === nav.title ? 'text-white' : 'text-secondary'} hover:text-white text-[18px] font-medium cursor-pointer`}
//                             onClick={() => setActive(nav.title)}
//                         >
//                             {nav.id ? <a href={`#${nav.id}`}>{nav.title}</a> : <Link href={nav.link!}>{nav.title}</Link>}
//                         </li>
//                     ))}
//                 </ul>

//                 <div className="sm:hidden flex flex-1 justify-end items-center">
//                     <Image src={toggle ? close : menu} alt="menu" className="w-[28px] h-[28px] object-contain" onClick={() => setToggle(!toggle)} />

//                     <div className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
//                         <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
//                             {navLinks.map((nav) => (
//                                 <li
//                                     key={nav.title}
//                                     className={`font-poppins font-medium cursor-pointer text-[16px] ${active === nav.title ? 'text-white' : 'text-secondary'}`}
//                                     onClick={() => {
//                                         setToggle(!toggle)
//                                         setActive(nav.title)
//                                     }}
//                                 >
//                                     {nav.id ? <a href={`#${nav.id}`}>{nav.title}</a> : <Link href={nav.link!}>{nav.title}</Link>}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//                 <div className="flex">
//                     {user ? <h2 className="text-sm flex items-center pr-1">Welcome {user.name}</h2> : null}
//                     <Link href={user ? '/logout' : '/sign-in'} className="text-sm bg-violet-600 py-1 px-2 rounded-md hover:bg-violet-700">
//                         {user ? 'Logout' : 'Sign In/Sign Up'}
//                     </Link>
//                 </div>
//             </div>
//         </>
//     )
// }
// export default NavLinks