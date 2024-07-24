import { getAnimeList } from "./api/data";
import AnimeList from "./components/AnimeList";

export default async function Home() {
  const animes = await getAnimeList()
  return (
    <main className="">      
      <AnimeList animes={animes} />
    </main>
  );
}
