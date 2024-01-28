import { Product } from "../../app/models/product"

type CatalogProps = {
  products: Product[],
  addProducts: () => void,
}

export default function Catalog(props:CatalogProps) {

  const { products, addProducts } = props;

  return (
    <>
      <ul>
        {
          products.map((ele)=>{
            return (
                <li key={ele.id}>{ele.name} - {ele.price}</li>
            )
          })
        }
      </ul>
      <button onClick={addProducts}>Add Product</button>
    </>
  )
}
