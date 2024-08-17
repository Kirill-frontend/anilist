
'use client'

import SearchInput from '@/app/components/SearchInput'
import { IGenre } from '../types/genre'
import { searchAction } from '../api/search'
import { Suspense, useEffect, useState } from 'react'
import AnimeList from '../components/AnimeList'
import { IAnime, IData } from '../types/data'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'
import { useSearchParams } from 'next/navigation'

const Page = () => {

  const searchParams = useSearchParams()
  const offset: number = parseInt(searchParams.get('offset') || '0')

  const [nextLink, setNextLink] = useState('')
  const [prevLink, setPrevLink] = useState('')
  const [animes, setAnimes] = useState<IAnime[] | []>([])


  useEffect(() => {
    const getAnimeFromURL = async () => {      
      const genres: string[] = searchParams.get('filter[categories]')?.split(',') || []
      const text: string | '' = searchParams.get('filter[text]') || ''
      if (genres.length > 0 || text) {
        const nextUrl = `search?filter[text]=${text}&filter[categories]=${genres}&offset=${offset + 12}`
        const prevUrl = `search?filter[text]=${text}&filter[categories]=${genres}&offset=${(offset - 12) < 0 ? 0 : (offset - 12)}`
        setNextLink(nextUrl)
        setPrevLink(prevUrl)

        const result = await searchAction({ genres, offset, text })

        setAnimes(result)

      }
    }

    getAnimeFromURL()
  }, [searchParams])


  return (
    <Suspense>
      <div className='container mx-auto'>
        <div className="pt-20">
          <SearchInput />
          {/* {loading ? <Loader size='global' /> : } */}
          <>
            <Pagination nextLink={{ link: nextLink, isHidden: true }} prevLink={{ link: prevLink, isHidden: offset === 0 }} />
            <AnimeList animes={animes} />
          </>
        </div>

      </div>
    </Suspense>
  )
}

export default Page