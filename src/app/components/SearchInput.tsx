'use client'
import { useState } from "react";
import { IGenre } from '@/app/types/genre'
import { Checkbox, Label } from "flowbite-react";
import Loader from "./Loader";
import { useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {

  const searchParams = useSearchParams()

  const router = useRouter()
  const [text, setText] = useState('');
  const [genres, setGenres] = useState<IGenre>({
    adventure: false,
    comedy: false,
    drama: false,
    romance: false,
    action: false,
    scifi: false,
    mystery: false,
    horror: false,
    fantasy: false,
    crime: false,
    music: false,
    game: false,
    space: false,
    cyberpunk: false,
    detective: false,
    historical: false,
    post_apocalyptic: false,
    steampunk: false,
    magic: false,
    romance_comedy: false,
  });

  type GenresTitles = {
    [K in keyof IGenre]: string;
  }

  interface IGenre {
    [key: string]: boolean;
  }

  const genresTitles: GenresTitles = {
    adventure: 'Adventure',
    comedy: 'Comedy',
    drama: 'Drama',
    romance: 'Romance',
    action: 'Action',
    scifi: 'Sci-Fi',
    mystery: 'Mystery',
    horror: 'Horror',
    fantasy: 'Fantasy',
    crime: 'Crime',
    music: 'Music',
    game: 'Game',
    space: 'Space',
    cyberpunk: 'Cyberpunk',
    detective: 'Detective',
    historical: 'Historical',
    post_apocalyptic: 'Post-Apocalyptic',
    steampunk: 'Steampunk',
    magic: 'Magic',
    romance_comedy: 'Romance Comedy',
  }



  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const handledGenres = []

    for (const g in genres) {
      if (genres[g]) handledGenres.push(g)
    }

    // console.log(handledGenres)
    const query = new URLSearchParams(searchParams.toString())

    query.set('filter\[text\]', text)
    query.set('filter[categories]', handledGenres.join(','))
    query.set('page[offset]', '0')

    router.push(`/search?${query.toString()}`)
    console.log('123');
    
  }

  return (
    <form onSubmit={handleSubmit} className=' px-4 md:px-0'>
      <div className="max-w-64">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="bg-transparent w-full text-white placeholder:text-white outline-none rounded-lg  border-[1px] ring-0 " placeholder="Input some anime name..." />

      </div>
      <div className="pt-5 flex flex-col flex-wrap md:max-h-32 max-h-72">
        {Object.entries(genresTitles).map((key, idx) => {
          return (
            <div key={idx} className="flex items-center mb-4">
              <Checkbox color={'green'} id={key[0]} value={key[0]} name={key[0]} checked={genres[key[0]]} onChange={(e) => setGenres({ ...genres, [key[0]]: e.target.checked })} />
              <Label htmlFor={key[0]} className="ms-2 text-sm font-medium  text-gray-300"> {genresTitles[key[0]]} </Label>
            </div>
          )
        })}
      </div>
      <div className="flex md:justify-end justify-start">
        <button className="text-white border-none py-2 max-w-72 w-full px-3 text-center hover:bg-gray-400 transition-all bg-gray-500 rounded-md disabled:bg-gray-400 flex justify-center gap-2 items-center" >Find </button>
      </div>
    </form>
  )
}

export default SearchInput