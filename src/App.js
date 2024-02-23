import React from "react";
import { BrowserRouter as Router,
          Routes,
          Route,
          Link} from "react-router-dom";
import './App.css';
import { useRoutes } from "react-router-dom";
import { RegisterForm } from "./Components/RegisterForm";
import { AddMovie } from "./Components/AddMovie";
import { AddRating } from "./Components/AddRating";
import { AddGenre } from "./Components/AddGenre";
import { AddStudio } from "./Components/AddStudio";
import LoginForm from "./Components/LoginForm";
import LandingPage from "./Components/LandingPage";
import UserProfile from "./Components/UserProfile";
import UserView from "./Components/UserView";
import MovieList from "./Components/MovieList";
import Studios from "./Components/Studios";
import Ratings from "./Components/Ratings";
import GenreList from "./Components/GenreList"
import axios from 'axios';

// Axios.get("https://catfact.ninja/fact").then((res) => {
//   console.log(res.data);
// })

function NoMatch() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404: Page Not Found</h2>
      <p><font color="white">There is no page at the requested url</font></p>
    </div>
  );
}

function UnAuthorized() {
  return (
    <div style={{ padding: 20 }}>
      <h2>401: Unauthorized</h2>
      <p><font color="white">You are not authorized to view the page at the requested url</font></p>
    </div>
  );
}

function App() {

  return (
    <div>
          <nav style={{ margin: 10 }}>
            <Link to="/" style={{ padding: 5 }}>Home</Link>
            <Link to="/login" style={{ padding: 5 }}>Login</Link>
            <Link to="/userprofile" style={{ padding: 5 }}>User Profile</Link>
            <Link to="/users" style={{ padding: 5 }}>Users</Link>
            <Link to="/movielist" style={{ padding: 5 }}>Movie Database</Link>
            <Link to="/studios" style={{ padding: 5 }}>Studios</Link>
            <Link to="/ratings" style={{ padding: 5 }}>Ratings</Link>
            <Link to="/genrelist" style={{ padding: 5 }}>Genres</Link>
          </nav>
          <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/users" element={<UserView />} />
            <Route path="/movielist" element={<MovieList />} />
            <Route path="/genrelist" element={<GenreList />} />
            <Route path="/newmovieentry" element={<AddMovie />} />
            <Route path="/newratingentry" element={<AddRating />} />
            <Route path="/newgenreentry" element={<AddGenre />} />
            <Route path="/newstudioentry" element={<AddStudio />} />
            <Route path="/studios" element={<Studios />} />
            <Route path="/ratings" element={<Ratings />} />
            <Route path="/unauthorized" element={<UnAuthorized />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
          </div>
    </div>
  );
}

export default App;
