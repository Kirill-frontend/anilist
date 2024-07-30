'use client'
import { Suspense, useEffect, useState } from "react";
import { getAnimeList } from "./api/data";
import AnimeList from "./components/AnimeList";
import Pagination from "./components/Pagination";
import { IAnime } from "./types/data";
import Loader from "./components/Loader";

export default function Home() {
  const [animes, setAnimes] = useState<IAnime | []>([])
  const [offset, setOffset] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await getAnimeList(offset)
      setAnimes(response)
      setLoading(false)

    }
    fetchData()
  }, [offset, page])

  const nextHandler = () => {
    setPage(prev => prev + 1)
    setOffset(prev => prev + 12)
    console.log(page)
  }

  const prevHandler = () => {
    setOffset(prev => {
      if ((prev - 12) > 0) {
        return prev - 12
      }
      else {
        return 0
      }
    })
    setPage(prev => --prev)

  }

  return (
    <main className="container mx-auto">
      <div className="">
        {loading ? <Loader size="global" /> : <>
          <Pagination nextHandler={nextHandler} view={{ prev: page !== 1 ? true : false, next: true }} prevHandler={prevHandler} />
          <AnimeList animes={animes} /></>}
      </div>
    </main>
  );
}

// pagination +
// user not found +
// loaders  
// suspens