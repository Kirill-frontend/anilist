'use client'
import { getAnimeById } from "@/app/api/data"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { checkWatch, switchWatch } from "../../../../lib/action"
import Loader from "@/app/components/Loader"



const Page = ({ params }: { params: { id: string } }) => {
  const [animeState, setAnimeState] = useState({
    id: '',
    type: '',
    links: {},
    attributes: {
      averageRating: 0,
      titles: {
        en: '',
        en_jp: '',
        ja_jp: '',
      },
      description: '',
      youtubeVideoId: ''
    },
    relationships: {},
    loading: true
  })
  const [isWatching, setIsWatching] = useState(false)
  const [loading, setLoading] = useState(false)


  const { data: session } = useSession()


  useEffect(() => {
    getAnimeById(params.id).then((anime) => { setAnimeState(anime) })
    checkWatch(session?.user.id, params.id).then((watch) => { setIsWatching(watch) })
  }, [])


  const switchWatchList = () => {
    setLoading(true)
    switchWatch(session?.user.id, params.id)
    setIsWatching(prev => !prev)
    setLoading(false)

  }
  return (
    <>
      {animeState.loading ? <> <Loader size="global" /> </> : <>
        <div className='container mx-auto text-white py-20 flex lg:flex-row gap-4 px-4 md:px-0 items-center justify-between flex-col'>
          {/* left side */}
          <div className="">
            {/* rating */}
            <div className="text-xl md:text-3xl"> Average Rating: {(+animeState.attributes.averageRating / 20).toFixed(1)} </div>
            {/* title */}
            <div className="text-xl py-5 md:text-4xl"> {animeState.attributes.titles.en || animeState.attributes.titles.en_jp} </div>
            {/* description */}
            <div className=" text-lg max-w-[40rem]"> {animeState.attributes.description} </div>
            {/* buttons */}
            {isWatching ? (<>
              <div className="pt-5">
                <button className="py-2 px-4 bg-red-300 text-gray-800 rounded-md hover:bg-gray-400" onClick={switchWatchList}> Remove from Watchlist {loading && <Loader size="small" />} </button>
              </div>
            </>) : (<>
              <div className="pt-5">
                <button className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400" onClick={switchWatchList}> Add to Watchlist {loading && <Loader size="small" />} </button>
              </div>
            </>)}
          </div>

          {/* right side trailers  */}
          <div className="w-[50%]">
            <iframe className="w-full h-96" src={`https:www.youtube.com/embed/${animeState.attributes.youtubeVideoId}`} title="【Animation】Fate / stay night (Trailer)【English】" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </div>
      </>}

    </>

  )
}

export default Page