'use client'

import { useSession } from "next-auth/react"
import { IAnime } from "../types/data"
import { useEffect, useState } from "react"
import { checkWatch, switchWatch } from "../../../lib/action"
import Loader from "./Loader"

const AnimeInfo = ({ anime, id }: { anime: IAnime, id: string }) => {

  const { data: session } = useSession()

  const [isWatching, setIsWatching] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session?.user.id) {
      checkWatch(session?.user.id, id).then((watch) => { setIsWatching(watch) })
    }
  }, [session])


  const switchWatchList = () => {
    if (session) {

      setLoading(true)
      switchWatch(session?.user.id, id)
      setIsWatching(prev => !prev)
      setLoading(false)
    } else {
      alert('u need to be logged in')
    }

  }
  return (
    <>
      <div className='container mx-auto text-white py-20 flex lg:flex-row gap-4 px-4 md:px-0 items-center justify-between flex-col'>
        {/* left side */}
        <div className="">
          {/* rating */}
          {anime.attributes?.averageRating && (

            <div className="text-xl md:text-3xl"> Average Rating: {(+anime.attributes?.averageRating / 20).toFixed(1) || 0} </div>
          )}
          {/* title */}
          <div className="text-xl py-5 md:text-4xl"> {anime.attributes?.titles.en || anime.attributes?.titles.en_jp} </div>
          {/* description */}
          <div className=" text-lg max-w-[40rem]"> {anime.attributes?.description} </div>
          {/* buttons */}
          {isWatching ? (<>
            <div className="pt-5">
              <button className="py-2 px-4 bg-red-300 text-gray-800 rounded-md hover:bg-gray-400" onClick={switchWatchList}> Remove from Watchlist {loading && <Loader size="small" />} </button>
            </div>
          </>) : (<>
            <div className="pt-5">
              {anime.id && (

                <button className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400" onClick={switchWatchList}> Add to Watchlist {loading && <Loader size="small" />} </button>
              )}
            </div>
          </>)}
        </div>

        {/* right side trailers  */}
        <div className="w-[50%]">
          {anime.id && (

            <iframe className="w-full h-96" src={`https:www.youtube.com/embed/${anime.attributes?.youtubeVideoId}`} title="【Animation】Fate / stay night (Trailer)【English】" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          )}
        </div>
      </div>
    </>
  )
}

export default AnimeInfo