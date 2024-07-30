'use client'
import Link from "next/link"

import { Dropdown } from "flowbite-react"
import { signIn, signOut, useSession } from "next-auth/react"
import Loader from "./Loader"

const NavBar = () => {
  const { data: session, status } = useSession()

  return (
    < div className="" >

      <div className='container mx-auto pt-5 px-3 flex justify-between items-center'>
        {/* logo  */}
        <div className="">
          <Link href="/" className="text-white uppercase text-xl md:text-3xl"> anilist </Link>
        </div>
        {/* navigation items  */}
        <div className="text-white flex gap-2">
          <Link href='/watchlist' className="flex items-center"> Watchlist </Link>
          <Link href='/search' className="flex items-center"> Search </Link>
          {status == 'loading' ? <Loader size="small" /> : !session ?
            <>
              <Dropdown label="Sign In">
                <Dropdown.Item onClick={() => signIn('google')}>
                  Sign in with Google
                </Dropdown.Item>
                <Dropdown.Item onClick={() => signIn('facebook')}>
                  Sign in with Facebook
                </Dropdown.Item>
              </Dropdown>
            </>
            : <>
              <button onClick={() => signOut()} className="px-3 py-1 border rounded-md hover:bg-white hover:text-black transition-all">Sign Out</button>
            </>}
  
        </div>
      </div>
    </div >

  )
}

export default NavBar