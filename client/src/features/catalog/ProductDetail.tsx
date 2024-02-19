import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Product } from "../../app/models/product";

import agent from "../../app/api/agent";

import Loading from "../../app/layout/Loading";
import NotFound from "../../app/errors/NotFound";
import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";

export default function ProductDetail(){
    
    const {basket, setBasket, removeItem} = useStoreContext();
    const { id } = useParams<{id: string}>();
    const [product, setProduct] = useState<Product | null>();
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const item = basket?.items.find(i => i.productId === product?.id);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        
        if(parseInt(event.currentTarget.value) < 1) {
            return;
        }

        setQuantity(parseInt(event.currentTarget.value));
    }

    function handleUpdateCart(){
        const prevQuantity = basket?.items.find(i => i.productId === product?.id)?.quantity;
        if(quantity === prevQuantity) {
            return;
        }

        if(!product) return;

        setSubmitting(true);
        if(!item || quantity > item.quantity){
            const updateedQuantity = item ? quantity - item.quantity : quantity;
            agent.Basket.addItem(product.id, updateedQuantity)
            .then(basket => setBasket(basket))
            .catch(err => console.error(err))
            .finally(() => setSubmitting(false));
        } else {
            const updateQuantity = item.quantity - quantity;
            agent.Basket.removeItem(product?.id, updateQuantity)
            .then(() => removeItem(product?.id, updateQuantity))
            .catch(err => console.log(err))
            .finally(() => setSubmitting(false))
        }
    }

    useEffect(()=> {
        // axios.get(`http://localhost:5252/api/products/${id}`).then((response)=> {
        //     // if(response.status === 200) {
        //     //     setLoading(false);
        //     //     setProduct(response.data)
        //     // }
        //     // 이렇게 한꺼번에 처리하지 말고
        //     setProduct(response.data);
        // }).catch(err => console.error(err))
        // .finally(() => setLoading(false))

        if(item) {
            setQuantity(item.quantity);
        }

        id && agent.Catalog.details(parseInt(id))
        .then(res => setProduct(res))
        .catch(err => console.error(err))
        .finally(() => setLoading(false))
        
    }, [id, item])

    if (loading) return <Loading message="Loading Product"/>

    if (!product) return <NotFound/>

    const { brand, description, name, pictureUrl, price, quantityInStock, type } = product;

    return (
        <>
            <Grid container spacing={6}>
                <Grid item xs={6}>
                    <img src={pictureUrl} alt={product.name} style={{width: '100%'}}></img>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h3">{name}</Typography>
                    <Divider sx={{mb: 2}}/>
                    <Typography variant="h4" color='secondary'>{(price /100).toFixed(2)}</Typography>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>{name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>{description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell>{type}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Brand</TableCell>
                                    <TableCell>{brand}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Quantity in stock</TableCell>
                                    <TableCell>{quantityInStock}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                onChange={handleInputChange}
                                variant="outlined"
                                type='number'
                                label='Quantity in Cart'
                                fullWidth
                                value={quantity}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <LoadingButton
                                disabled={item?.quantity === quantity || !item && quantity === 0}
                                loading={submitting}
                                onClick={handleUpdateCart}
                                sx={{height: '55px'}}
                                color='primary'
                                size='large'
                                variant='contained'
                                fullWidth
                            >
                                {item ? 'Update Quantity' : 'Add to Cart'}
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}