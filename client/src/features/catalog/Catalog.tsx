import Loading from "../../app/layout/Loading";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList"
import { useEffect } from "react";
import { fetchProductsAsync, productSelectors } from "./catalogtSlice";


export default function Catalog() {
// export default function Catalog(props:CatalogProps) {
//  const { products, addProducts } = props;

// 윗줄처럼 하면 주석 단 곳을 안써도 되니 가독성이 좋아진다

// const [products, setProducts] = useState<Product[]>([]);
const products = useAppSelector(productSelectors.selectAll);
const disaptch = useAppDispatch();
const {productsLoaded, status} = useAppSelector(state => state.catalog);

// useEffect(()=> {
//   fetch(`http://localhost:5252/api/Products`)
//   .then(response => response.json())
//   .then(result => setProducts(result))
// }, []) // 빈 배열은 한번만 실행한다는 거였지

useEffect(()=> {
  if (!productsLoaded) disaptch(fetchProductsAsync());
}, [productsLoaded, disaptch]) // 빈 배열은 한번만 실행한다는 거였지

if (status.includes('pending')) return <Loading message="Loading..."/>


  return (
    <>
      <ProductList products={products}/>   
    </>
  )
}

