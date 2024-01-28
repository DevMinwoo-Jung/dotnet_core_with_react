import { Grid } from '@mui/material'
import { ProductProps } from '../../app/models/product'
import ProductCard from './ProductCard'

export default function ProductList({products}:ProductProps) {
  return (
  <Grid container spacing={4}>
    {
      products.map((item)=>{
        return (
          <Grid item xs={4}>
            <ProductCard product={item} key={item.id}/>
          </Grid>
        )
      })
    }
  </Grid>
  )
}
