'use client'

import { useSession } from "next-auth/react"
import { getCountWatchList, getWatchList } from "../../../lib/action";
import { useEffect, useState } from "react";
import AnimeList from "../components/AnimeList";
import { IAnime } from "../types/data";
import UserNotFound from "../components/UserNotFound";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";


const Page = () => {
  const { data: session, status } = useSession()
  const [animeState, setAnimeState] = useState<IAnime | []>([])
  const [count, setCount] = useState(0)
  const [offset, setOffset] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const maxPage = Math.ceil(count / 12) || 1


  useEffect(() => {
    setLoading(true)
    if (session) {
      getWatchList(session?.user.id, offset).then(item => {
        setLoading(false)
        setAnimeState(item)
      });
    }


  }, [offset])

  useEffect(() => {
    if (session) {
      getCountWatchList(session?.user.id).then(async (count) => {
        setCount(count);
      });
    }
  }, [])


  const nextHandler = () => {
    setPage(prev => ++prev)
    setOffset(prev => prev + 10)
  }

  const prevHandler = () => {

    setOffset(prev => {
      if ((prev - 10) > 0) {
        return prev - 10
      }
      else {
        return 0
      }
    })
    setPage(prev => --prev)
  }

  if (status === 'unauthenticated') {
    return <UserNotFound />
  }

  if (status === 'loading') {
    return <div className="text-white text-center text-4xl pt-10 flex items-center justify-center gap-4">Loading... <Loader size="global" /></div>
  }



  return (
    <div className='container mx-auto pt-10'>
      {loading ? <Loader size="global" /> : <>
        <div className="">
          <span className="text-white text-xl md:text-3xl">Your Watch List: </span>
        </div>
        {count > 12 && <Pagination nextHandler={nextHandler} view={{ next: page === maxPage ? false : true, prev: page === 1 ? false : true }} prevHandler={prevHandler} />}
        {animeState && <AnimeList animes={animeState} />}
      </>}



    </div>
  )
}

export default Page