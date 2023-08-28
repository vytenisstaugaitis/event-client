import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Footer from "./components/Footer";
import Events from "./pages/Events"

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token))

  return (
    <>
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/" /> } />
              <Route path="/profile/:userId" element={isAuth ?<Profile /> : <Navigate to="/" /> } />
              <Route path="/events" element={isAuth ? <Events /> : <Navigate to="/" /> } />
            </Routes>
            <Footer />
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
