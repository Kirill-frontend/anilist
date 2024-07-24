
'use client'

import SearchInput from '@/app/components/SearchInput'
import { IGenre } from '../types/genre'
import { searchAction } from '../api/search'
import { useState } from 'react'
import AnimeList from '../components/AnimeList'
import { IData } from '../types/data'

const Page = () => {
  const [animes, setAnimes] = useState<IData | []>([])

  const searchHandler = async (data: {text: string, genres: IGenre}) => {
    const result = await searchAction(data)
    setAnimes(result)
  }

  return (
    <div className='container mx-auto'>
      <div className="pt-20">
        <SearchInput handleInput={searchHandler}/>
        <AnimeList animes={animes} />
      </div>
      
    </div>
  )
}

export default Page