'use client'

import Image from "next/image"
import Link from "next/link"
import { IAnime } from "../types/data"

import ImageSkeleton from "./ImageSkeleton"
import { useState } from "react"

const AnimeCard = ({ anime }: { anime: IAnime }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <Link href={`/anime/${anime.id}`} className='flex flex-col items-center'>
      {/* img */}
      <div className="relative">
          {!loaded && <ImageSkeleton />}
          <Image src={anime.attributes.posterImage.original} className="rounded-lg" alt="anime" width={220} height={340} onLoad={() => setLoaded(true)} />


      </div>
      {/* title */}
      <div className="text-white text-2xl uppercase text-center max-w-[232px]">
        {anime.attributes.titles.en || anime.attributes.titles.en_jp}
      </div>
    </Link>
  )
}



export default AnimeCard