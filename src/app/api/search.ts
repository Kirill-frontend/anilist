
import { IAnime, IData } from "../types/data"
import { IGenre } from "../types/genre"

export const searchAction = async (data: { text: string, genres: string[], offset: number }): Promise<IAnime[]> => {
  // const genres = Object.fromEntries(Object.entries(data.genres).filter(([_, value]) => value))


  // const genresText = Object.entries(genres).map((value) => { return value[0] }).join(',')
  const genresText = data.genres.join(',')

  const reqUrlGenres = genresText.length ? `filter[categories]=${genresText}` : ''
  const reqUrlText = data.text ? `filter[text]=${data.text}` : ''



  try {
    const request = await fetch(`https://kitsu.io/api/edge/anime?${genresText ? reqUrlGenres + '&' + reqUrlText : reqUrlText}&page[offset]=${data.offset}&page[limit]=12`)

    if (!request.ok) {
      throw new Error('Failed to fetch data')
    }

    const json = await request.json()
    return json.data
  } catch (error) {
    throw new Error('Failed to fetch data')

  }

}