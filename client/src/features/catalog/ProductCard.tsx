import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { SingleProduct } from "../../app/models/product";
import { Link } from 'react-router-dom'
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../../app/store/configureStore";
import { setBasket } from "../basket/basketSlice";


export default function ProductCard({product}:SingleProduct) {

  const { name ,pictureUrl, price, brand } = product

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  function handleAddItem(productId: number) {
    
    setLoading(true);

    agent.Basket.addItem(productId)
      .then((basket) => dispatch(setBasket(basket)))
      .catch(err => console.log(err))
      .finally(()=> setLoading(false))
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: 'secondaary'}}>
            {name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={name}
        titleTypographyProps={{
          sx: {
            fontWeight: 'bold',
            color: 'primary.main'
          }
        }}
      />
      <CardMedia
        sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.dark' }}
        image={pictureUrl}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" color="secondary">
          ₩{(price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {brand}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={loading} size="small" onClick={()=> handleAddItem(product.id)}>Add to Cart</LoadingButton>
        <Button size="small" component={Link} to={`/catalog/${product.id}`}>View</Button>
      </CardActions>
    </Card>
  )
}
