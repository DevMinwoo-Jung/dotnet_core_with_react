import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import { useStoreContext } from "../context/StoreContext";
import agent from "../api/agent";
import { getCookie } from "../utils/utisl";
import Loading from "./Loading";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";

function App() {
  //const {setBasket} = useStoreContext();
  const dispath = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const buyerId = getCookie('buyerId');

    if (buyerId) {
      agent.Basket.get()
        .then((basket => dispath(setBasket(basket))))
        .catch(err => console.error(err))
        .finally(() => setLoading(false))
    }

  }, [dispath])


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

  if (loading) {
    return <Loading message={"initialize App..."}/>
  } 
    

  return (
    <ThemeProvider theme={theme} >
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
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
