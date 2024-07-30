
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
  const [offset, setOffset] = useState(0)
  const [page, setPage] = useState(1)
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




  const searchHandler = async (data: { text: string, genres: IGenre }) => {
    setLoading(true)
    setSearchData(data)
    setOffset(0)
    setLoading(true)
    const result = await searchAction(data, offset)
    setOffset(10)
    setAnimes(result)
    setLoading(false)
  }

  const nextHandler = async () => {
    setLoading(true)

    setOffset(prev => prev + 10)
    setPage(prev => ++prev)
    const req = await searchAction(searchData, offset)
    setAnimes(req)
    setLoading(false)
  }

  const prevHandler = async () => {
    setOffset(prev => {
      if ((prev - 10) > 0) {
        return prev - 10
      }
      else {
        return 0
      }
    })
    setPage(prev => --prev)
    setLoading(true)

    const req = await searchAction(searchData, offset)
    setAnimes(req)
    setLoading(false)
  }

  // useEffect(() => {
  //   console.log('useeffect')
  //   const getNewData = async () => {


  //   }
  //   getNewData()
  // }, [offset, page])
  return (
    <div className='container mx-auto'>
      <div className="pt-20">
        <SearchInput handleInput={searchHandler} loading={loading} />
        {loading ? <Loader size='global' /> : <>
          <Pagination nextHandler={nextHandler} prevHandler={prevHandler} view={{ next: true, prev: offset > 10 ? true : false }} />
          <AnimeList animes={animes} />
        </>}
      </div>

    </div>
  )
}

export default Page