import agent from "../../app/api/agent";
import Loading from "../../app/layout/Loading";
import { Product } from "../../app/models/product"
import ProductList from "./ProductList"
import { useState, useEffect } from "react";


export default function Catalog() {
// export default function Catalog(props:CatalogProps) {
//  const { products, addProducts } = props;

// 윗줄처럼 하면 주석 단 곳을 안써도 되니 가독성이 좋아진다

const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);

// useEffect(()=> {
//   fetch(`http://localhost:5252/api/Products`)
//   .then(response => response.json())
//   .then(result => setProducts(result))
// }, []) // 빈 배열은 한번만 실행한다는 거였지

useEffect(()=> {
  agent.Catalog.list()
  .then(products => setProducts(products))
  .catch(err => console.error(err))
  .finally(() => setLoading(false))
}, []) // 빈 배열은 한번만 실행한다는 거였지

if (loading) return <Loading message="Loading..."/>


  return (
    <>
      <ProductList products={products}/>   
    </>
  )
}

