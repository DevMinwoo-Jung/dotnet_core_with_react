import Loading from "../../app/layout/Loading";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList"
import { useEffect } from "react";
import { fetchFilters, fetchProductsAsync, productSelectors } from "./catalogtSlice";
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";

const sortOptions = [
  {value: 'name', label: 'Alphabetical'},
  {value: 'priceDesc', label: 'Price - High to Low'},
  {value: 'price', label: 'Price - Low to High'},
]

export default function Catalog() {
// export default function Catalog(props:CatalogProps) {
//  const { products, addProducts } = props;

// 윗줄처럼 하면 주석 단 곳을 안써도 되니 가독성이 좋아진다

// const [products, setProducts] = useState<Product[]>([]);
const products = useAppSelector(productSelectors.selectAll);
const disaptch = useAppDispatch();
const {productsLoaded, status, filtersLoaded, types, brands} = useAppSelector(state => state.catalog);

console.log(brands);
// useEffect(()=> {
//   fetch(`http://localhost:5252/api/Products`)
//   .then(response => response.json())
//   .then(result => setProducts(result))
// }, []) // 빈 배열은 한번만 실행한다는 거였지
useEffect(()=> {
  if (!productsLoaded) disaptch(fetchProductsAsync());
}, [productsLoaded, disaptch]) 

useEffect(()=> {
  if (!filtersLoaded) disaptch(fetchFilters());
}, [disaptch, filtersLoaded]) // 빈 배열은 한번만 실행한다는 거였지



if (status.includes('pending')) return <Loading message="Loading..."/>


  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{mb: 2}}>
          <TextField label="Search Product" variant="outlined" fullWidth/>
        </Paper>
        <Paper sx={{mb: 2, p: 2}}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup>
              {sortOptions.map(({value, label}) => (
                <FormControlLabel value={value} control={<Radio />} label={label} key={value}/>
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
        <Paper>
          <FormGroup sx={{mb: 2, p: 2}}>
            {brands.map(brand => (
              <FormControlLabel control={<Checkbox></Checkbox>} label={brand}/>
            ))}
          </FormGroup>
        </Paper>
        <Paper>
          <FormGroup sx={{mb: 2, p: 2}}>
            {types.map(type => (
              <FormControlLabel control={<Checkbox></Checkbox>} label={type}/>
            ))}
          </FormGroup>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products}/>   
      </Grid>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={9}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography>
            Displaying 1-6 of 20 items
          </Typography>
          <Pagination
            color="secondary"
            size="large"
            count={10}
            >

          </Pagination>
        </Box>
      </Grid>
    </Grid>
  )
}

