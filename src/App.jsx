import { useEffect, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${API_KEY}`,
  },
};
function App() {
  const [searchTerm, setsearchTerm] = useState("");
  //for error message
  const [errorMessage, setErrorMessage] = useState(null);
  //state for movies
  const [movieList, setMovieList] = useState([]);
  //loading state
  const [isloading, setIsLoading] = useState(false);
  //debounce use state
  const [debouncedSearchTerm, setdebouncedSearchTerm] = useState("");

  const fetchMovies = async (query = "") => {
    //before anything will start loading
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      // alert(response);
      // throw new Error("Error fetching movies");
      if (!response.ok) {
        throw new Error("Error fetching movies");
      }
      const data = await response.json();
      // console.log(data);
      if (data.Response === "False") {
        setErrorMessage(data.Error || "Error fetching movies");
        setMovieList([]); //return empty array if there is an error
        return;
      }
      setMovieList(data.results || []);
      // setErrorMessage(null);
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies, please try again");
    } finally {
      setIsLoading(false); //either the fetch is successful or not, we will set the loading to false
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]); //only run this when the component is load

  //!debounce the search term to avoid multiple fetch request
  //! by waiting for the user to stop typing for 500ms
  useDebounce(
    () => {
      setdebouncedSearchTerm(searchTerm);
    },
    1000,
    [searchTerm]
  );
  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./hero-img.png" alt="Hero Banner" srcset="" />
            <h1>
              Find <span className="text-gradient"> movies </span>you enjoy
              without the hassle
            </h1>
            <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
          </header>
          {"display movies here"}
          <section className="all-movies">
            <h2 className="mt-[20px]">All movies</h2>
            {isloading ? (
              <Spinner />
            ) : (
              <>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <ul>
                  {movieList.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </ul>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
