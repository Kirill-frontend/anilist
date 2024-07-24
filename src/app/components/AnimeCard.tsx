import Image from "next/image"
import Link from "next/link"
import { IAnime } from "../types/data"

const AnimeCard = ({ anime } : {anime: IAnime}) => {
  return (
    <Link href={`/anime/${anime.id}`} className='flex flex-col items-center'>
      {/* img */}
      <div className="">
        <Image src={anime.attributes.posterImage.original} className="rounded-lg" alt="anime" width={220} height={340} />
      </div>
      {/* title */}
      <div className="text-white text-2xl uppercase text-center">
        {anime.attributes.titles.en || anime.attributes.titles.en_jp}
      </div>
    </Link>
  )
}

export default AnimeCard