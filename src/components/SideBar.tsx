import { useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";

interface SideBarProps{
  genres:{
    id:number,
    title:string,
    name:"action" | "comedy" | "documentary" | "drama" | "horror" | "family",
  }[],
  setMovies(data:MovieProps[]):void
  setSelectedGenre(data:GenreResponseProps):void


}
interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}


interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar({genres,setMovies,setSelectedGenre}:SideBarProps) {
  // Complete aqui
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
    api.get<MovieProps[]>(`movies/?Genre_id=${id}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${id}`).then(response => {
      setSelectedGenre(response.data);
    })
  }

  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}