import { useEffect, useState } from 'react';

import { Button } from '../components/Button';
import GenreResponseProps from '../interfaces/GenreResponseProps';

import { api } from '../services/api';

import '../styles/sidebar.scss';

interface SidebarProps {
  setSelectedGenreId(id: number): void
  selectedGenreId: number
}

export function SideBar({ setSelectedGenreId, selectedGenreId }: SidebarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => setSelectedGenreId(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}