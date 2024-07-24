'use client'
import { useState } from "react";
import { IGenre } from '@/app/types/genre'

const SearchInput = ({handleInput}: {handleInput: Function}) => {
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
    dark_fantasy: false,
    magic: false,
    romance_comedy: false,
  });

  const genresTitles: IGenre = {
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
    dark_fantasy: 'Dark Fantasy',
    magic: 'Magic',
    romance_comedy: 'Romance Comedy',
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    handleInput({text, genres})
  }

  return (
    <form onSubmit={handleSubmit} className=''>
      <div className="max-w-64">
        <input type="text" name='anime-name' value={text} onChange={(e) => setText(e.target.value)} className="bg-transparent w-full text-white placeholder:text-white outline-none border-b-[1px] border-b-white" placeholder="Input some anime name..." />
      </div>
      <div className="pt-5 flex flex-col flex-wrap max-h-32">
        {Object.entries(genresTitles).map((key, idx) => {
          return (
            <div key={idx} className="flex items-center mb-4">
              <input id={key[0]} type="checkbox" value={key[0]} name={`genre-${key[0]}`} checked={genres[key[0]]} onChange={(e) => setGenres({ ...genres, [key[0]]: e.target.checked })} className="w-4 h-4 text-white bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor={key[0]} className="ms-2 text-sm font-medium  text-gray-300">{genresTitles[key[0]]}</label>
            </div>
          )
        })}
      </div>
      <div className="flex justify-end">
        <button className="text-white border-none py-2 max-w-72 w-full px-3 text-center hover:bg-gray-400 transition-all bg-gray-500 rounded-md">Find</button>
      </div>
    </form>
  )
}

export default SearchInput