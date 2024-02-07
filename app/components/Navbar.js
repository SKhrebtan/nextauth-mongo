'use client'
import Link from "next/link";
import {useSession, signOut} from 'next-auth/react'
const Navbar = () => {
    const { data: session } = useSession();
    return (
        <div>
            <ul className='flex justify-between m-10 items-center'>
                <div >
                    <Link href='/'>
                        <li>Home</li>
                    </Link>
                      </div>
                    <div className='flex gap-10'>
                    <Link href='/dashboard'>
                        <li>Dashboard</li>
                    </Link>        
                    {!session ? (
                        <>
                        <Link href='/login'>
                        <li>Login</li>
                    </Link>              
                    <Link href='/register'>
                        <li>Register</li>
                            </Link>
                        </>
                    ) :
                        <>
                            {session.user?.email}
                            <li>
                                <button
                                onClick={()=>signOut()}
                                    className='p-2 px-5 -mt-1 bg-blue-500 rounded-full'
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