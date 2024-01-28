import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { useEffect, useState } from "react";

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
        <Catalog/>      
      </Container>
    </ThemeProvider>
  )
}

export default App
