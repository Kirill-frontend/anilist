
import AnimeCard from "./AnimeCard"
import { IAnime, IData } from "../types/data"

const AnimeList = ({ animes }: { animes:  IAnime[] | [] }) => {  


  return (
    <>
      <div className='flex  md:flex-row flex-wrap flex-col items-center gap-2 md:justify-evenly justify-start '>
      {animes.length === 0 && (<h1 className="text-white text-xl"> Not found any animes by your criteries </h1>)}

        {animes.length > 0 && animes.map((anime: IAnime) => {
          return (
            <AnimeCard key={anime.id} anime={anime} />
          )
        })}
      </div>

    </>
  )
}

export default AnimeList