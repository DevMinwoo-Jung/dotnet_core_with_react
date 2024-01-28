import { useEffect, useState } from "react"
import { Product } from "../models/product";

import { Typography } from "@mui/material";
import Catalog from "../../features/catalog/Catalog";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(()=> {
    fetch(`http://localhost:5252/api/Products`)
    .then(response => response.json())
    .then(result => setProducts(result))
  }, []) // 빈 배열은 한번만 실행한다는 거였지

  function addProducts(){
    setProducts(prevState => [...prevState, 
      {
        id: prevState.length + 1,
        name: `products${Math.random()}`,
        price: Math.random() * 1000,
        brand: 'Minwoos',
        description: 'some description',
        pictureUrl: 'http://picsum.potos/200',
      }])
  }

  return (
    <>
      <Typography variant="h1" style={{color: 'blue'}}>Vite + React</Typography>
      <Catalog products={products} addProducts={addProducts}/>
    </>
  )
}

export default App
