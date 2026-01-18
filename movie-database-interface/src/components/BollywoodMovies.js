import React, { useState, useMemo } from 'react';
import './BollywoodMovies.css';

const bollywoodMovies = [
  {
    id: 1,
    title: "Bade Miya chote Miya",
    genre: "Action",
    rating: 8.9,
    year: 2025,
    director: "David Dhawan",
    Image: "https://stat4.bollywoodhungama.in/wp-content/uploads/2022/02/Bade-Miyan-Chote-Miyan-1.jpg",
    cast: ["Akshay Kumar", "Tiger Shroff"],
  },
  {
    id: 2,
    title: "Fighter 2",
    genre: "Action",
    rating: 9.9,
    year: 2025,
    director: "Siddharth Anand",
    Image: "https://images.indianexpress.com/2024/01/fighter-28012024.jpg",
    cast: ["Hrithik Roshan", "Deepika Padukone"],
  },
  {
    id: 3,
    title: "Dhurander",
    genre: "Action",
    rating: 9.9,
    year: 2025,
    director: "Rajkumar Santoshi",
    Image: "https://mxp-media.ilnmedia.com/media/content/2025/Jul/image-1_6878a8415b761.jpeg?w=780&h=1064&cc=1",
    cast: ["Ranvir Singh", "Sara Arjun"],
  },
  {
    id: 4,
    title: "Pushpa 2",
    genre: "Drama",
    rating: 8.3,
    year: 2024,
    director: "Sukumar",
    Image: "https://m.media-amazon.com/images/M/MV5BZjllNTdiM2QtYjQ0Ni00ZGM1LWFlYmUtNWY0YjMzYWIxOTYxXkEyXkFqcGc@._V1_.jpg",
    cast: ["Allu Arjun", "Rashmika Mandanna"],
  },
  {
    id: 5,
    title: "Tere Ishq Mein",
    genre: "Romance",
    rating: 8.9,
    year: 2025,
    director: "Aanand L. Rai",
    Image: "https://stat4.bollywoodhungama.in/wp-content/uploads/2023/06/Tere-Ishk-Mein27.jpg",
    cast: ["Dhanush", "Kriti Sanon"],
  },
  {
    id: 6,
    title: "Phas Gaye Re Obama",
    genre: "Comedy",
    rating: 6.9,
    year: 2010,
    director: "Subhash Kapoor",
    Image: "https://upload.wikimedia.org/wikipedia/en/b/bb/Car-Poster-Final_12x18.jpg",
    cast: ["Neha Dhupia", "Sanjay Mishra"],
  },
  {
    id: 7,
    title: "Mrs. Chatterjee vs. Norway",
    genre: "Biography",
    rating: 7.3,
    year: 2023,
    director: "Ashima Chibber",
    Image: "https://m.media-amazon.com/images/M/MV5BYmMwMDM5ZmEtNzkyZi00MjY3LWJiMzMtMWVjMWYxMzFiMzIxXkEyXkFqcGc@._V1_.jpg",
    cast: ["Rani Mukerji", "Bodhisattva Mazumdar"],
  },
  {
    id: 8,
    title: "Beta",
    genre: "Romance",
    rating: 5.9,
    year: 1992,
    director: "Indra Kumar",
    Image: "https://m.media-amazon.com/images/M/MV5BYzU0NjVhYzktY2Q4Zi00MTUzLTlmZTUtODI5ODdlYTg1YjNkXkEyXkFqcGc@._V1_.jpg",
    cast: ["Anil Kapoor", "Madhuri Dixit"],
  },
];

function BollywoodMovies() {
  const [loading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [movies] = useState(bollywoodMovies);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');

  // ⭐ Favourite State
  const [favourites, setFavourites] = useState([]);

  const getRatingCategory = (rating) => {
    if (rating >= 9.5) return 'blockbuster';
    if (rating >= 8.5) return 'superhit';
    if (rating >= 7.5) return 'hit';
    return 'average';
  };

  // ⭐ Toggle Favourite
  const toggleFavourite = (movieId) => {
    setFavourites(prev =>
      prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  const sortedAndFilteredMovies = useMemo(() => {
    const filtered = movies.filter(movie => {
      const searchLower = searchTerm.toLowerCase();

      const matchesSearch =
        movie.title.toLowerCase().includes(searchLower) ||
        movie.genre.toLowerCase().includes(searchLower) ||
        movie.director.toLowerCase().includes(searchLower) ||
        movie.cast.some(actor => actor.toLowerCase().includes(searchLower)) ||
        movie.year.toString().includes(searchTerm);

      const matchesGenre =
        selectedGenre === 'All' || movie.genre === selectedGenre;

      return matchesSearch && matchesGenre;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.year - a.year;
        case 'genre':
          return a.genre.localeCompare(b.genre);
        default:
          return a.title.localeCompare(b.title);
      }
    });
  }, [movies, searchTerm, selectedGenre, sortBy]);

  // ⭐ Favourite Movies List
  const favouriteMovies = movies.filter(movie =>
    favourites.includes(movie.id)
  );

  const genres = ['All', ...new Set(movies.map(movie => movie.genre))];

  return (
    <div className="bollywood-movies">
      <h2>Bollywood Hits</h2>

      {/* ⭐ Favourite Section */}
      {favouriteMovies.length > 0 && (
        <>
          <h3>❤️ Favourite Movies</h3>
          <div className="movies-grid">
            {favouriteMovies.map(movie => (
              <div className="movie-card" key={movie.id}>
                <img src={movie.Image} alt={movie.title} className="movie-image" />
                <h3 className="movie-title">{movie.title}</h3>

                <button
                  className="favourite-btn active"
                  onClick={() => toggleFavourite(movie.id)}
                >
                  ❤️ Unfavourite
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 🔍 Search */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search Bollywood movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* 🎭 Genre Filter */}
      <div className="filter-section">
        <h4>Filter by Genre:</h4>
        <div className="genre-buttons">
          {genres.map(genre => (
            <button
              key={genre}
              className={`genre-button ${selectedGenre === genre ? 'active' : ''}`}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* 🔃 Sort */}
      <div className="sort-section">
        <label>Sort By:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="title">Title (A-Z)</option>
          <option value="rating">Rating (High-Low)</option>
          <option value="year">Year (Newest)</option>
          <option value="genre">Genre (A-Z)</option>
        </select>
      </div>

      <div className="movies-grid">
        {sortedAndFilteredMovies.map(movie => (
          <div className="movie-card" key={movie.id}>
            <img src={movie.Image} alt={movie.title} className="movie-image" />
            <h3 className="movie-title">{movie.title}</h3>
            <p>{movie.year} • {movie.genre}</p>

            <p className={`movie-rating rating-${getRatingCategory(movie.rating)}`}>
              {movie.rating}/10
            </p>

            <button
              className={`favourite-btn ${favourites.includes(movie.id) ? 'active' : ''}`}
              onClick={() => toggleFavourite(movie.id)}
            >
              {favourites.includes(movie.id) ? '❤️ Unfavourite' : '🤍 Favourite'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BollywoodMovies;
