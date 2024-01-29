import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Home from "../../features/home/Home";
import ProductDetail from "../../features/catalog/ProductDetail";
import About from "../../features/about/About";
import Catalog from "../../features/catalog/Catalog";
import Contact from "../../features/contact/Contact";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '', element: <Home/>
            },
            {
                path: 'catalog', element: <Catalog/>
            },
            {
                path: 'catalog/:id', element: <ProductDetail/>
            },
            {
                path: 'about', element: <About/>
            },
            {
                path: 'contact', element: <Contact/>
            }
        ]
    }
])