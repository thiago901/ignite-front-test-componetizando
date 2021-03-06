import { useEffect, useState } from 'react';


import { Button } from './components/Button';
import { MovieCard } from './components/MovieCard';

// import { SideBar } from './components/SideBar';
// import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
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

export function App() {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
    api.get<MovieProps[]>(`movies/?Genre_id=${1}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${1}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, []);



  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar genres={genres} setSelectedGenre={setSelectedGenre} setMovies={setMovies}/>
      <Content movies={movies} title={selectedGenre.title} />
    </div>
  )
}