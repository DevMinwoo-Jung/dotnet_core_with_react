import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function App() {

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark': 'light';

  const theme = createTheme({
    palette: {
      mode: paletteType
    },
  });

  const changeTheme = () => {
    setDarkMode((prev)=> !prev);
  }

  useEffect(()=> {
    setDarkMode(darkMode);
  }, [darkMode])

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline/>
      <Header setTheme={changeTheme}/>
      <Container>
        <Outlet/>
        {/* path '/' 밑에 있는 애들이 rendering된다  */}
      </Container>
    </ThemeProvider>
  )
}

export default App
