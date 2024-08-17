'use client'
import { getAnimeById } from "@/app/api/data"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { checkWatch, switchWatch } from "../../../../lib/action"
import Loader from "@/app/components/Loader"
import { IAnime } from "@/app/types/data"



const Page = ({ params }: { params: { id: string } }) => {
  const [animeState, setAnimeState] = useState<IAnime>({
    map: (arg0: (anime: IAnime) => import("react").JSX.Element): import("react").ReactNode => {
      return null;
    },
    id: '',
    type: '',
    links: {
      self: ''
    },
    attributes: {
      createdAt: '',
      updatedAt: '',
      slug: '',
      synopsis: '',
      description: '',
      coverImageTopOffset: 0,
      titles: {
        en: '',
        en_jp: '',
        ja_jp: ''
      },
      canonicalTitle: '',
      abbreviatedTitles: [],
      averageRating: '',
      ratingFrequencies: {
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': '',
        '8': '',
        '9': '',
        '10': '',
        '11': '',
        '12': '',
        '13': '',
        '14': '',
        '15': '',
        '16': '',
        '17': '',
        '18': '',
        '19': '',
        '20': ''
      },
      userCount: 0,
      favoritesCount: 0,
      startDate: '',
      endDate: '',
      nextRelease: null,
      popularityRank: 0,
      ratingRank: 0,
      ageRating: '',
      ageRatingGuide: '',
      subtype: '',
      status: '',
      tba: null,
      posterImage: {
        tiny: '',
        large: '',
        small: '',
        medium: '',
        original: '',
        meta: {
          dimensions: {
            tiny: { width: 0, height: 0 },
            large: { width: 0, height: 0 },
            small: { width: 0, height: 0 },
            medium: { width: 0, height: 0 }
          }
        }
      },
      coverImage: {
        tiny: '',
        large: '',
        small: '',
        original: '',
        meta: {
          dimensions: {
            tiny: { width: 0, height: 0 },
            large: { width: 0, height: 0 },
            small: { width: 0, height: 0 }
          }
        }
      },
      episodeCount: 0,
      episodeLength: 0,
      totalLength: 0,
      youtubeVideoId: '',
      showType: '',
      nsfw: false
    },
    relationships: {
      genres: { links: { self: '', related: '' } },
      categories: { links: { self: '', related: '' } },
      castings: { links: { self: '', related: '' } },
      installments: { links: { self: '', related: '' } },
      mappings: { links: { self: '', related: '' } },
      reviews: { links: { self: '', related: '' } },
      mediaRelationships: { links: { self: '', related: '' } },
      staff: { links: { self: '', related: '' } },
      productions: { links: { self: '', related: '' } },
      quotes: { links: { self: '', related: '' } },
      episodes: { links: { self: '', related: '' } },
      streamingLinks: { links: { self: '', related: '' } },
      animeProductions: { links: { self: '', related: '' } },
      animeCharacters: { links: { self: '', related: '' } },
      animeStaff: { links: { self: '', related: '' } }
    },
    loading: true
  })




  const [isWatching, setIsWatching] = useState(false)
  const [loading, setLoading] = useState(false)


  const { data: session } = useSession()


  useEffect(() => {
    getAnimeById(params.id).then((anime: IAnime) => { setAnimeState(anime) })
    if (session?.user.id) {
      checkWatch(session?.user.id, params.id).then((watch) => { setIsWatching(watch) })
    }
  }, [session])


  const switchWatchList = () => {
    if (session) {

      setLoading(true)
      switchWatch(session?.user.id, params.id)
      setIsWatching(prev => !prev)
      setLoading(false)
    } else {
      alert('u need to be logged in')
    }

  }
  return (
    <>
      {animeState.loading ? (<> <Loader size="global" /> </>) : <>
        <div className='container mx-auto text-white py-20 flex lg:flex-row gap-4 px-4 md:px-0 items-center justify-between flex-col'>
          {/* left side */}
          <div className="">
            {/* rating */}
            {animeState.attributes.averageRating && (

              <div className="text-xl md:text-3xl"> Average Rating: {(+animeState.attributes.averageRating / 20).toFixed(1) || 0} </div>
            )}
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
                {animeState.id && (

                  <button className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400" onClick={switchWatchList}> Add to Watchlist {loading && <Loader size="small" />} </button>
                )}
              </div>
            </>)}
          </div>

          {/* right side trailers  */}
          <div className="w-[50%]">
            {animeState.id && (

              <iframe className="w-full h-96" src={`https:www.youtube.com/embed/${animeState.attributes.youtubeVideoId}`} title="【Animation】Fate / stay night (Trailer)【English】" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            )}
          </div>
        </div>
      </>}

    </>

  )
}



export default Page