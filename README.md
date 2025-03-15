# MovieApp

MovieApp is a web application that allows users to search for movies and view trending movies. It uses the TMDB API for movie data and Appwrite for managing search counts.

## Features

- Search for movies by title
- View trending movies
- Display movie details including title, rating, release date, and language

## Technologies Used

- React
- Vite
- Tailwind CSS
- Appwrite
- TMDB API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/movieapp.git
   cd movieapp
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your API keys:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key
   VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
   VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
   VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
   ```

### Running the Application

1. Start the development server:

   ```sh
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

### Building for Production

To create a production build, run:

```sh
npm run build
```

# Screenshots
