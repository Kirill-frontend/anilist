
import AnimeCard from "./AnimeCard"
import { IAnime, IData } from "../types/data"

const AnimeList =  ({ animes }: { animes: IData | [] }) => {

  return (
    <div className='flex min-h-screen md:flex-row flex-wrap flex-col items-center gap-2 md:justify-evenly justify-start p-24'>
      {animes && animes.map((anime: IAnime) => {
        return (
          <AnimeCard key={anime.id} anime={anime} />
        )
      })}
    </div>
  )
}

export default AnimeList