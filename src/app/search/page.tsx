
'use client'

import SearchInput from '@/app/components/SearchInput'
import { IGenre } from '../types/genre'
import { searchAction } from '../api/search'
import { useEffect, useState } from 'react'
import AnimeList from '../components/AnimeList'
import { IData } from '../types/data'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'

const Page = () => {
  const [animes, setAnimes] = useState<IData | []>([])
  const [searchData, setSearchData] = useState<{ text: string, genres: IGenre }>({
    text: '', genres: {
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
    }
  })
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const getNewData = async () => {
  
      const req = await searchAction(searchData, offset)
      setAnimes(req)
      setLoading(false)
    }
    getNewData()
  }, [offset, page])

  const searchHandler = async (data: { text: string, genres: IGenre }) => {
    setLoading(true)
    setSearchData(data)
    const result = await searchAction(data, offset)
    setAnimes(result)
    setLoading(false)
  }

  const nextHandler = () => {
    setOffset(prev => prev + 10)
    setPage(prev => ++prev)
    console.log(page)
  }

  const prevHandler = () => {
    setOffset(prev => {
      if ((prev - 10) > 0) {
        return prev - 10
      }
      else {
        return 0
      }
    })
    setPage(prev => --prev)
  }

  return (
    <div className='container mx-auto'>
      <div className="pt-20">
        <SearchInput handleInput={searchHandler} loading={loading}/>
        {loading ? <Loader size='global' /> : <>
          <Pagination nextHandler={nextHandler} prevHandler={prevHandler} view={{ next: true, prev: offset > 10 ? true : false }} />
          <AnimeList animes={animes} />
        </>}
      </div>

    </div>
  )
}

export default Page