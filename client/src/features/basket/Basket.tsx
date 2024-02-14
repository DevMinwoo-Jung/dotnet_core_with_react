import { useEffect, useState } from "react"
import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";
import Loading from "../../app/layout/Loading";
import { Typography } from "@mui/material";

export default function Basket() {

  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState<Basket | null>(null);

  useEffect(()=> {
    agent.Basket.get()
      .then(basket => setBasket(basket))
      .catch(error => console.error(error))
      .finally(()=> setLoading(false));
  }, [])

  if(loading) return <Loading message="loading basket..."/>

  if(!basket) return <Typography variant="h3">Your basket it empoty</Typography>

  return (
    <div>Buyer Id = {basket.buyerId}</div>
  )
}
