'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation';

import {useSession, signOut} from 'next-auth/react'
const Navbar = () => {
    const pathname = usePathname();
    const { data: session } = useSession();
    return (
        <div className='h-[45px]'>
            <ul className='flex justify-between m-10 items-center'>
                <div className='flex items-center'>
                    <Link href='/'>
                        <li className={`${pathname === '/'? 'text-fuchsia-500 underline underline-offset-8': '' } `}>Home</li>
                    </Link>
                      </div>
                    <div className='flex items-center gap-10'>
                    {session && <Link href='/dashboard'>
                       <li
                            className={`${pathname === '/dashboard'? 'text-fuchsia-500 underline underline-offset-8': '' } `}
                        >Dashboard</li>
                    </Link>  }       
                    {!session ? (
                        <>
                        <Link href='/login'>
                        <li className={`${pathname === '/login'? 'text-fuchsia-500 underline underline-offset-8': '' } `}>Login</li>
                    </Link>              
                    <Link href='/register'>
                        <li className={`${pathname === '/register'? 'text-fuchsia-500 underline underline-offset-8': '' } `}>Register</li>
                            </Link>
                        </>
                    ) :
                        <>
                            {session.user?.email}
                            <li>
                                <button
                                onClick={()=>signOut()}
                                    className='p-[5px] bg-blue-500 rounded-full'
                                    type='button'>Logout</button>
                            </li>
                        </>
                    }
                </div>
              
            </ul>
        </div>
    )
}
export default Navbar;