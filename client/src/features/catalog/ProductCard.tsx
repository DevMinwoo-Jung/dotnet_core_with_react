import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { SingleProduct } from "../../app/models/product";
import { Link } from 'react-router-dom'
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";


export default function ProductCard({product}:SingleProduct) {

  const { name ,pictureUrl, price, brand } = product

  //const [loading, setLoading] = useState(false);
  // 아래로 대체
  const {status} = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();

  // function handleAddItem(productId: number) {
    
  //   setLoading(true);

  //   agent.Basket.addItem(productId)
  //     .then((basket) => dispatch(setBasket(basket)))
  //     .catch(err => console.log(err))
  //     .finally(()=> setLoading(false))
  // }

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
        <LoadingButton loading={status.includes('pendingAddItem' + product.id)} size="small" 
                  onClick={()=> dispatch(addBasketItemAsync({productId: product.id}))}>Add to Cart</LoadingButton>
        <Button size="small" component={Link} to={`/catalog/${product.id}`}>View</Button>
      </CardActions>
    </Card>
  )
}
