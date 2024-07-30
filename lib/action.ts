'use server'

import { prisma } from "./prisma"

export const switchWatch = async (userId: string, animeId: string) => {
  try {
    const existingWatch = await prisma.watchList.findFirst({
      where: {
        userId, animeId
      }
    })

    if (existingWatch) {
      await prisma.watchList.delete({
        where: {
          id: existingWatch.id,
        }
      })
    } else {
      await prisma.watchList.create({
        data: {
          userId,
          animeId
        }
      })
    }
  } catch (err) {

  }

}

export const checkWatch = async (userId: string, animeId: string) => {
  try {
    const existingWatch = await prisma.watchList.findFirst({
      where: {
        userId,
        animeId
      }
    })

    if (existingWatch) return true
    else return false
  } catch (error) {

  }

}

export const getWatchList = async (userId: string, offset: number = 0) => {
  try {
    const watchList = await prisma.watchList.findMany({
      where: { userId },
    })

    const animeIds = watchList.map(item => item.animeId).join(',')

    const request = await fetch(`https://kitsu.io/api/edge/anime?filter[id]=${animeIds}&page[limit]=12&page[offset]=${offset}`)

    if (!request.ok) {
      throw new Error('Failed to fetch data')
    }

    const json = await request.json()
    return json.data
  } catch (error) {

  }
}

export const getCountWatchList = async (userId: string) => {
  try {
    const watchList = await prisma.watchList.findMany({
      where: { userId },
    })

    return watchList.length
  } catch (error) {

  }
}