import { Button } from "@mui/material"
import { Product } from "../../app/models/product"
import ProductList from "./ProductList"

type CatalogProps = {
  products: Product[],
  addProducts: () => void,
}

export default function Catalog({ products, addProducts }:CatalogProps) {
// export default function Catalog(props:CatalogProps) {
//  const { products, addProducts } = props;

// 윗줄처럼 하면 주석 단 곳을 안써도 되니 가독성이 좋아진다

  return (
    <>
      <ProductList products={products}/>
      <Button variant="contained" onClick={addProducts}>Add Product</Button>
    </>
  )
}
