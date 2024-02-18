// import { useEffect, useState } from "react"
// import agent from "../../app/api/agent";
// import Loading from "../../app/layout/Loading";
import { Basket } from "../../app/models/basket";
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";

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

  const {basket, setBasket, removeItem} = useStoreContext();
  const [loading, setLoading] = useState(false);

  function handleAddItem(productId: number){
    setLoading(true);
    agent.Basket.addItem(productId)
      .then(basket => setBasket(basket))
      .catch(err => console.error(err))
      .finally(()=> setLoading(false))
  }

  function handleRemoveItem(productId: number, quantity: number = 1){
    setLoading(true);
    agent.Basket.removeItem(productId, quantity)
      .then(()=> removeItem(productId, quantity))
      .catch(err => console.error(err))
      .finally(()=> setLoading(false))
  }


  if(!basket) return <Typography variant="h3">Your basket it empoty</Typography>

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Qunatity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right">)</TableCell>
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
              <TableCell align="right">{(item.price / 100).toFixed(2)}원</TableCell>
              <TableCell align="center">
                <LoadingButton loading={loading} color="error" onClick={() => handleRemoveItem(item.productId)}>
                    <Remove/>
                </LoadingButton>
                {item.quantity}
                <LoadingButton loading={loading} color="secondary" onClick={() => handleAddItem(item.productId)}>
                    <Add/>
                </LoadingButton>
                </TableCell>
              <TableCell align="right">{item.price * item.quantity}</TableCell>
              <TableCell align="right">
              <LoadingButton loading={loading} color="error" onClick={() => handleRemoveItem(item.productId, item.quantity)}>
                  <Delete/>
              </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
