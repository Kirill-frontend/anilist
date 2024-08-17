'use client'

import { useSession } from "next-auth/react"
import { getCountWatchList, getWatchList } from "../../../lib/action";
import { Suspense, useEffect, useState } from "react";
import AnimeList from "../components/AnimeList";
import { IAnime } from "../types/data";
import UserNotFound from "../components/UserNotFound";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import { useSearchParams } from "next/navigation";


const Page = () => {
  const params = useSearchParams()
  const offset = parseInt(params.get('offset') || '0')

  const { data: session, status } = useSession()
  const [animeState, setAnimeState] = useState<IAnime[] | []>([])
  const [count, setCount] = useState(0)
  const [nextLink, setNextLink] = useState('')
  const [prevLink, setPrevLink] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {


    setLoading(true)

    if (session) {


      getWatchList(session?.user.id, offset).then(item => {
        setAnimeState(item)
        const nextUrl = `/watchlist?offset=${offset + 12}`
        const prevUrl = `/watchlist?offset=${(offset - 12) < 0 ? 0 : (offset - 12)}`
        setNextLink(nextUrl)
        setPrevLink(prevUrl)
        setLoading(false)
      }).catch(err => { console.error('some error') });
      getCountWatchList(session?.user.id).then((count) => {
        setCount(count);
      });
    }

  }, [params])


  if (status === 'unauthenticated') {
    return <UserNotFound />
  }


  return (
    <div className='container mx-auto pt-10'>
      <div className="">
        <span className="text-white text-xl md:text-3xl">Your Watch List: </span>
      </div>
      {/* {loading ? <Loader size="global" /> : } */}
      <Suspense fallback={<Loader size="global" />}>
        <>
          <Pagination nextLink={{ link: nextLink, isHidden: offset + 12 >= count }} prevLink={{ link: prevLink, isHidden: offset === 0 }} />
          <AnimeList animes={animeState} />
          {/* {animeState && } */}
        </>
      </Suspense>



    </div>
  )
}

export default Page