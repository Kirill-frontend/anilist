import { getAnimeById } from "@/app/api/data"
import { Suspense } from "react"
import Loader from "@/app/components/Loader"
import AnimeInfo from "@/app/components/AnimeInfo"



const Page = async ({ params }: { params: { id: string } }) => {
  const anime = await getAnimeById(params.id)

  return (
    <>
      <Suspense fallback={<Loader size="global"  />}>
        <AnimeInfo anime={anime} id={params.id} />
      </Suspense>

    </>

  )
}



export default Page