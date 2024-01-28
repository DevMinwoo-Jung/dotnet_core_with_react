import { useState } from "react"

const dummy = [
  { name: '물건1', price: 100.00},
  { name: '물건2', price: 200.00},
]

function App() {
  const [products, setProducts] = useState([...dummy]);

  function addProducts(){
    setProducts(prevState => [...prevState, {
      name: `products${Math.random()}`,
      price: Math.random() * 1000 
    }])
  }

  return (
    <>
      <h1 style={{color: 'blue'}}>Vite + React</h1>
      <ul>
        {
          products.map((ele, index)=>{
            return (
                <li key={index}>{ele.name}{ele.price}</li>
            )
          })
        }
      </ul>
      <button onClick={addProducts}>Add Product</button>
    </>
  )
}

export default App
