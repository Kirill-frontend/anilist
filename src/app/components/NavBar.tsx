import Link from "next/link"

const NavBar = () => {
  const isLoggined = false

  return (
    <div className='container mx-auto pt-5 px-3 flex justify-between items-center'>
      {/* logo  */}
      <div className="">
        <Link href="/" className="text-white uppercase text-xl md:text-3xl"> anilist </Link>
      </div>
      {/* navigation items  */}
      <div className="text-white flex gap-2">
        <Link href='/'> Watchlist </Link>
        <Link href='/search'> Search </Link>

        {!isLoggined && <p> Sign In/Sign Up </p>}
      </div>
    </div>
  )
}

export default NavBar