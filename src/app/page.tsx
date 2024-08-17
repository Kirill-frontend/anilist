'use client'
import { Suspense, useEffect, useState } from "react";
import { getAnimeList } from "./api/data";
import AnimeList from "./components/AnimeList";
import Pagination from "./components/Pagination";
import { IAnime } from "./types/data";
import Loader from "./components/Loader";
import { useSearchParams } from "next/navigation";



export default function Home() {

  const pageParams = useSearchParams()
  const offset = parseInt(pageParams.get('offset') || '0')
  const [animes, setAnimes] = useState<IAnime[] | []>([])
  const [nextLink, setNextLink] = useState('')
  const [prevLink, setPrevLink] = useState('')
  const [loading, setLoading] = useState(true)


  const fetchData = async () => {
    setLoading(true)

    const response = await getAnimeList(offset)
    setAnimes(response)
    const nextUrl = `?offset=${offset + 12}`
    const prevUrl = `?offset=${(offset - 12) < 0 ? 0 : (offset - 12)}`
    setNextLink(nextUrl)
    setPrevLink(prevUrl)
    setLoading(false)

  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchData()
  }, [pageParams])


  return (
    <main className="container mx-auto">
      <div className="">
        {/* {loading ? <Loader size="global" /> : } */}
        <Suspense fallback={<Loader size="global" />}>
          <>
            <Pagination nextLink={{ link: nextLink, isHidden: false }} prevLink={{ link: prevLink, isHidden: offset === 0 }} />
            <AnimeList animes={animes} />
          </>
        </Suspense>
      </div>
    </main>
  );
}

// pagination +
// user not found +
// loaders
// suspens