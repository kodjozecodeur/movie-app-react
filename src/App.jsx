import { useEffect, useState } from "react";
import Search from "./components/search";

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
  const [moviesList, setMoviesList] = useState([]);
  //loading state
  const [isloading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    //before anything will start loading
    setisLoading(true);
    setErrorMessage("");
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
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
        setMoviesList([]); //return empty array if there is an error
        return;
      }
      setMoviesList(data.results || []);
      // setErrorMessage(null);
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies, please try again");
    } finally {
      setIsLoading(false); //either the fetch is successful or not, we will set the loading to false
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []); //only run this when the component is load

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
            <h2>All movies</h2>
            {"display movies here"}
            {isloading ? <p className="text-white">Loading...</p> : errorMessage ? <p className="text-red-500">{errorMessage}</p> : <ul>moviesList.map((movies)=>(
              <li key={movies.id}>
                <img src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`} alt={movies.title} />
                <h3>{movies.title}</h3>
                <p>{movies.overview}</p>
              </li>
              ))</ul>
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
