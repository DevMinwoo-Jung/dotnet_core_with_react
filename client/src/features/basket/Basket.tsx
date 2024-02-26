// import { useEffect, useState } from "react"
// import agent from "../../app/api/agent";
// import Loading from "../../app/layout/Loading";
import { Basket } from "../../app/models/basket";
import { Box, Button, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";

export default function Basket() {

  // const [loading, setLoading] = useState(true);
  // const [basket, setBasket] = useState<Basket | null>(null);

  // useEffect(()=> {
  //   agent.Basket.get()
  //     .then(basket => setBasket(basket))
  //     .catch(error => console.error(error))
  //     .finally(()=> setLoading(false));
  // }, [])
  // if(loading) return <Loading message="loading basket..."/>

  const { basket, status } = useAppSelector(state => state.basket);
  const disaptch = useAppDispatch();
  // const [status, setStatus] = useState({
  //   loading: false,
  //   name: ''
  // })

  console.log(status);

  // function handleAddItem(productId: number, name: string){
  //   setStatus({loading: true, name});
  //   agent.Basket.addItem(productId)
  //     .then(basket => disaptch(setBasket(basket)))
  //     .catch(err => console.error(err))
  //     .finally(()=> setStatus({loading: false, name: ''}))
  // }

  // function handleRemoveItem(productId: number, quantity: number = 1, name: string){
  //   setStatus({loading: true, name});
  //   agent.Basket.removeItem(productId, quantity)
  //     .then(()=> disaptch(removeItem({productId, quantity})))
  //     .catch(err => console.error(err))
  //     .finally(()=> setStatus({loading: false, name: ''}))
  // }


  if(!basket) return <Typography variant="h3">Your basket it empoty</Typography>

  return (
    <>
    
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Qunatity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display='flex' alignItems='center'>
                    <img src={item.pictureUrl} alt={item.name} style={{height: 50, marginRight: 20}}></img>
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                <TableCell align="center">
                  <LoadingButton 
                      loading={status === 'pendingRemovingItem' + item.productId + 'rem'} 
                      color="error" 
                      onClick={() => disaptch(removeBasketItemAsync({productId: item.productId, quantity: 1, name: 'rem'}))}>
                      <Remove/>
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton 
                      loading={status === 'pendingAddItem' + item.productId} 
                      color="secondary" 
                      onClick={() => disaptch(addBasketItemAsync({productId: item.productId}))}>
                      <Add/>
                  </LoadingButton>
                  </TableCell>
                <TableCell align="right">{item.price * item.quantity}</TableCell>
                <TableCell align="right">
                <LoadingButton 
                      loading={status === 'pendingRemovingItem' + item.productId + 'del'} 
                      color="error" 
                      onClick={() => disaptch(
                        removeBasketItemAsync({productId: item.productId, quantity: item.quantity, name: 'del'}
                      ))}>
                    <Delete/>
                </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6}/>
        <Grid item xs={6}>
          <BasketSummary/>
          <Button
            component={Link}
            to='/checkout'
            variant='contained'
            size='large'
            fullWidth>
            checkout
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
