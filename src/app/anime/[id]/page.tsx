import { getAnimeById } from "@/app/api/data"
import { IAnime, IData } from "@/app/types/data"

const Page = async ({ params }: { params: { id: string } }) => {
  const animeData: IAnime = await getAnimeById(params.id)
  
  return (
    <div className='container mx-auto text-white py-20 flex lg:flex-row gap-4 px-4 md:px-0 items-center justify-between flex-col'>
      {/* left side */}
      <div className="">
        {/* rating */}
        <div className="text-xl md:text-3xl"> Average Rating: {(+animeData.attributes.averageRating / 20).toFixed(1)} </div>
        {/* title */}
        <div className="text-xl py-5 md:text-4xl"> {animeData.attributes.titles.en || animeData.attributes.titles.en_jp} </div>
        {/* description */}
        <div className=" text-lg max-w-[40rem]"> {animeData.attributes.description} </div>
        {/* buttons */}
        <div className="pt-5">
          <button className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"> Add to Watchlist </button>
        </div>
      </div>

      {/* right side trailers  */}
      <div className="w-[50%]">
        <iframe className="w-full h-96" src={`https://www.youtube.com/embed/${animeData.attributes.youtubeVideoId}`} title="【Animation】Fate / stay night (Trailer)【English】" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>

    </div>
  )
}

export default Page