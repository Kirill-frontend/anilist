import { IAnime, IData } from "../types/data"

export const getAnimeList = async (offset: number = 0): Promise<IAnime[] | []> => {
  try {
    const request = await fetch(`https://kitsu.io/api/edge/anime?page[limit]=12&page[offset]=${offset}`)
    if (!request.ok) {
      throw new Error('Failed to fetch data')
    }
    const json = await request.json()
    return json.data
  } catch (error) {
    throw new Error('Failed to fetch data: ' +  error)
  }

}

export const getAnimeById = async (id: string): Promise<IAnime> => {
  try {
    const request = await fetch(`https://kitsu.io/api/edge/anime/${id}`)
    if (!request.ok) {
      throw new Error('error fetching anime')
    }
    const json = await request.json()
    return {...json.data, loading: false}
  } catch (error) {
    throw new Error('Failed to fetch data')
  }

}