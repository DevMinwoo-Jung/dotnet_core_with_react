import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Home from "../../features/home/Home";
import ProductDetail from "../../features/catalog/ProductDetail";
import About from "../../features/about/About";
import Catalog from "../../features/catalog/Catalog";
import Contact from "../../features/contact/Contact";
import ServerError from "../errors/ServerError";
import Basket from "../../features/basket/Basket";
import Checkout from "../../features/checkout/Checkout";

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
            },
            {
                path: 'server-error', element: <ServerError/>
            },
            {
                path: 'basket', element: <Basket/>
            },
            {
                path: '*', element: <Navigate replace to="/not-found"/>
            },
            {
                path: 'checkout', element: <Checkout/>
            }
        ]
    }
])